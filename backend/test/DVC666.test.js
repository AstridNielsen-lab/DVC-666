const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DVC666 Token", function () {
  let DVC666;
  let dvc666;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const TOTAL_SUPPLY = ethers.utils.parseEther("66666666");
  const PRESALE_SUPPLY = ethers.utils.parseEther("13333333");
  const PRESALE_PRICE = "10382000000000"; // 0.00010382 ETH
  const MIN_PURCHASE = ethers.utils.parseEther("0.001");
  const MAX_PURCHASE = ethers.utils.parseEther("10");

  beforeEach(async function () {
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    
    DVC666 = await ethers.getContractFactory("DVC666");
    dvc666 = await DVC666.deploy(owner.address);
    await dvc666.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await dvc666.owner()).to.equal(owner.address);
    });

    it("Should assign the correct total supply", async function () {
      const totalSupply = await dvc666.totalSupply();
      expect(totalSupply).to.equal(TOTAL_SUPPLY);
    });

    it("Should have correct token metadata", async function () {
      expect(await dvc666.name()).to.equal("Devil's Coin 666");
      expect(await dvc666.symbol()).to.equal("DVC666");
      expect(await dvc666.decimals()).to.equal(18);
    });

    it("Should have correct presale price", async function () {
      expect(await dvc666.PRESALE_PRICE()).to.equal(PRESALE_PRICE);
    });
  });

  describe("Presale", function () {
    beforeEach(async function () {
      // Start presale for 30 days
      await dvc666.startPresale(30 * 24 * 60 * 60);
    });

    it("Should start presale correctly", async function () {
      expect(await dvc666.presaleActive()).to.be.true;
    });

    it("Should allow token purchase during presale", async function () {
      const purchaseAmount = ethers.utils.parseEther("1");
      const expectedTokens = purchaseAmount.mul(ethers.utils.parseEther("1")).div(PRESALE_PRICE);
      
      await expect(
        dvc666.connect(addr1).buyTokens({ value: purchaseAmount })
      ).to.emit(dvc666, "TokensPurchased")
        .withArgs(addr1.address, expectedTokens, purchaseAmount);
      
      expect(await dvc666.balanceOf(addr1.address)).to.equal(expectedTokens);
    });

    it("Should reject purchases below minimum", async function () {
      const smallAmount = ethers.utils.parseEther("0.0005");
      
      await expect(
        dvc666.connect(addr1).buyTokens({ value: smallAmount })
      ).to.be.revertedWith("Below minimum purchase");
    });

    it("Should reject purchases above maximum", async function () {
      const largeAmount = ethers.utils.parseEther("15");
      
      await expect(
        dvc666.connect(addr1).buyTokens({ value: largeAmount })
      ).to.be.revertedWith("Above maximum purchase");
    });

    it("Should calculate token amounts correctly", async function () {
      const ethAmount = ethers.utils.parseEther("1");
      const expectedTokens = await dvc666.getTokenAmount(ethAmount);
      const calculatedTokens = ethAmount.mul(ethers.utils.parseEther("1")).div(PRESALE_PRICE);
      
      expect(expectedTokens).to.equal(calculatedTokens);
    });

    it("Should end presale correctly", async function () {
      await dvc666.endPresale();
      expect(await dvc666.presaleActive()).to.be.false;
    });
  });

  describe("Staking", function () {
    beforeEach(async function () {
      // Give addr1 some tokens to stake
      await dvc666.startPresale(30 * 24 * 60 * 60);
      await dvc666.connect(addr1).buyTokens({ value: ethers.utils.parseEther("1") });
    });

    it("Should allow staking tokens", async function () {
      const stakeAmount = ethers.utils.parseEther("1000");
      const userBalance = await dvc666.balanceOf(addr1.address);
      
      if (userBalance.gte(stakeAmount)) {
        await expect(
          dvc666.connect(addr1).stake(stakeAmount)
        ).to.emit(dvc666, "Staked")
          .withArgs(addr1.address, stakeAmount);
        
        const stakeInfo = await dvc666.stakes(addr1.address);
        expect(stakeInfo.amount).to.equal(stakeAmount);
        expect(stakeInfo.active).to.be.true;
      }
    });

    it("Should reject staking 0 tokens", async function () {
      await expect(
        dvc666.connect(addr1).stake(0)
      ).to.be.revertedWith("Cannot stake 0 tokens");
    });

    it("Should reject staking more than balance", async function () {
      const userBalance = await dvc666.balanceOf(addr1.address);
      const excessiveAmount = userBalance.add(ethers.utils.parseEther("1"));
      
      await expect(
        dvc666.connect(addr1).stake(excessiveAmount)
      ).to.be.revertedWith("Insufficient balance");
    });
  });

  describe("Admin Functions", function () {
    it("Should allow owner to enable trading", async function () {
      await expect(
        dvc666.enableTrading()
      ).to.emit(dvc666, "TradingEnabled");
      
      expect(await dvc666.tradingEnabled()).to.be.true;
    });

    it("Should allow owner to pause contract", async function () {
      await dvc666.pause();
      expect(await dvc666.paused()).to.be.true;
    });

    it("Should allow owner to set authorized addresses", async function () {
      await dvc666.setAuthorized(addr1.address, true);
      expect(await dvc666.authorized(addr1.address)).to.be.true;
    });

    it("Should allow authorized addresses to update blacklist", async function () {
      await dvc666.setAuthorized(addr1.address, true);
      
      await expect(
        dvc666.connect(addr1).setBlacklist(addr2.address, true)
      ).to.emit(dvc666, "BlacklistUpdated")
        .withArgs(addr2.address, true);
      
      expect(await dvc666.blacklisted(addr2.address)).to.be.true;
    });

    it("Should reject non-owner admin actions", async function () {
      await expect(
        dvc666.connect(addr1).enableTrading()
      ).to.be.revertedWith("Ownable: caller is not the owner");
    });
  });

  describe("Evolution System", function () {
    it("Should start with evolution 1", async function () {
      expect(await dvc666.currentEvolution()).to.equal(1);
    });

    it("Should have evolution bonus for level 1", async function () {
      expect(await dvc666.evolutionBonuses(1)).to.equal(100); // 1%
    });
  });

  describe("Security", function () {
    it("Should prevent blacklisted addresses from buying", async function () {
      await dvc666.setBlacklist(addr1.address, true);
      await dvc666.startPresale(30 * 24 * 60 * 60);
      
      await expect(
        dvc666.connect(addr1).buyTokens({ value: ethers.utils.parseEther("1") })
      ).to.be.revertedWith("Address is blacklisted");
    });

    it("Should prevent transfers when paused", async function () {
      await dvc666.pause();
      
      await expect(
        dvc666.transfer(addr1.address, ethers.utils.parseEther("100"))
      ).to.be.revertedWith("Pausable: paused");
    });
  });

  describe("View Functions", function () {
    beforeEach(async function () {
      await dvc666.startPresale(30 * 24 * 60 * 60);
    });

    it("Should return correct presale info", async function () {
      const presaleInfo = await dvc666.getPresaleInfo();
      
      expect(presaleInfo.price).to.equal(PRESALE_PRICE);
      expect(presaleInfo.sold).to.equal(0);
      expect(presaleInfo.remaining).to.equal(PRESALE_SUPPLY);
      expect(presaleInfo.active).to.be.true;
    });

    it("Should return correct min/max purchase amounts", async function () {
      const minMax = await dvc666.getMinMaxPurchase();
      
      expect(minMax.min).to.equal(MIN_PURCHASE);
      expect(minMax.max).to.equal(MAX_PURCHASE);
    });

    it("Should return correct contract balance", async function () {
      await dvc666.connect(addr1).buyTokens({ value: ethers.utils.parseEther("1") });
      
      const contractBalance = await dvc666.getContractBalance();
      expect(contractBalance).to.equal(ethers.utils.parseEther("1"));
    });
  });

  describe("Edge Cases", function () {
    it("Should handle multiple purchases correctly", async function () {
      await dvc666.startPresale(30 * 24 * 60 * 60);
      
      const purchase1 = ethers.utils.parseEther("1");
      const purchase2 = ethers.utils.parseEther("2");
      
      await dvc666.connect(addr1).buyTokens({ value: purchase1 });
      await dvc666.connect(addr1).buyTokens({ value: purchase2 });
      
      const totalPurchased = await dvc666.presalePurchases(addr1.address);
      const expectedTokens1 = purchase1.mul(ethers.utils.parseEther("1")).div(PRESALE_PRICE);
      const expectedTokens2 = purchase2.mul(ethers.utils.parseEther("1")).div(PRESALE_PRICE);
      
      expect(totalPurchased).to.equal(expectedTokens1.add(expectedTokens2));
    });

    it("Should prevent presale when not active", async function () {
      await expect(
        dvc666.connect(addr1).buyTokens({ value: ethers.utils.parseEther("1") })
      ).to.be.revertedWith("Presale is not active");
    });
  });
});

