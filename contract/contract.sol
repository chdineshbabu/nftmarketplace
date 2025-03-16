// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title NFTMarketplace
 * @dev Implements an NFT marketplace with minting, listing, buying, and royalty functionality
 */
contract NFTMarketplace is ERC721URIStorage, ERC721Enumerable, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _listingIds;

    // Marketplace fee percentage (in basis points, 100 = 1%)
    uint256 public marketplaceFeePercentage = 250; // 2.5%
    
    struct NFTListing {
        uint256 tokenId;
        address seller;
        uint256 price;
        bool isActive;
    }
    
    struct NFTRoyaltyInfo {
        address creator;
        uint256 percentage; // in basis points, 100 = 1%
    }
    
    // Mapping from token ID to its listing
    mapping(uint256 => NFTListing) public listings;
    
    // Mapping from token ID to its royalty info
    mapping(uint256 => NFTRoyaltyInfo) public royalties;
    
    // Mapping from token ID to its collection name
    mapping(uint256 => string) public collections;
    
    // Events
    event NFTMinted(uint256 indexed tokenId, address indexed creator, string tokenURI, string collection);
    event NFTListed(uint256 indexed tokenId, address indexed seller, uint256 price);
    event NFTSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price);
    event NFTListingCancelled(uint256 indexed tokenId, address indexed seller);
    event RoyaltyPaid(uint256 indexed tokenId, address indexed creator, uint256 amount);
    
    constructor() ERC721("NFT Marketplace", "NFTM") Ownable(msg.sender) {}
    
    /**
     * @dev Resolves the conflict between ERC721URIStorage and ERC721Enumerable
     */
    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721URIStorage, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
    
    /**
     * @dev Mints a new NFT
     * @param tokenURI The metadata URI for the NFT
     * @param royaltyPercentage The royalty percentage for future sales (in basis points)
     * @param collection The collection name for the NFT
     * @return The ID of the newly minted NFT
     */
    function mintNFT(string memory tokenURI, uint256 royaltyPercentage, string memory collection) 
        public 
        returns (uint256) 
    {
        require(royaltyPercentage <= 2500, "Royalty percentage cannot exceed 25%");
        
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        royalties[newTokenId] = NFTRoyaltyInfo({
            creator: msg.sender,
            percentage: royaltyPercentage
        });
        
        collections[newTokenId] = collection;
        
        emit NFTMinted(newTokenId, msg.sender, tokenURI, collection);
        
        return newTokenId;
    }
    
    /**
     * @dev Lists an NFT for sale
     * @param tokenId The ID of the NFT to list
     * @param price The price in ETH
     */
    function listNFT(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Only the owner can list the NFT");
        require(price > 0, "Price must be greater than zero");
        
        approve(address(this), tokenId);
        
        listings[tokenId] = NFTListing({
            tokenId: tokenId,
            seller: msg.sender,
            price: price,
            isActive: true
        });
        
        emit NFTListed(tokenId, msg.sender, price);
    }
    
    /**
     * @dev Buys a listed NFT
     * @param tokenId The ID of the NFT to buy
     */
    function buyNFT(uint256 tokenId) public payable nonReentrant {
        NFTListing storage listing = listings[tokenId];
        require(listing.isActive, "NFT is not listed for sale");
        require(msg.value >= listing.price, "Insufficient payment");
        
        address seller = listing.seller;
        uint256 price = listing.price;
        
        // Mark listing as inactive
        listing.isActive = false;
        
        // Calculate and pay royalties if applicable
        uint256 royaltyAmount = 0;
        if (royalties[tokenId].creator != seller && royalties[tokenId].percentage > 0) {
            royaltyAmount = (price * royalties[tokenId].percentage) / 10000;
            payable(royalties[tokenId].creator).transfer(royaltyAmount);
            emit RoyaltyPaid(tokenId, royalties[tokenId].creator, royaltyAmount);
        }
        
        // Calculate and deduct marketplace fee
        uint256 marketplaceFee = (price * marketplaceFeePercentage) / 10000;
        
        // Transfer remaining amount to seller
        uint256 sellerAmount = price - royaltyAmount - marketplaceFee;
        payable(seller).transfer(sellerAmount);
        
        // Transfer NFT to buyer
        _transfer(seller, msg.sender, tokenId);
        
        emit NFTSold(tokenId, seller, msg.sender, price);
        
        // Refund excess payment
        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
    }
    
    /**
     * @dev Cancels an NFT listing
     * @param tokenId The ID of the NFT listing to cancel
     */
    function cancelListing(uint256 tokenId) public {
        NFTListing storage listing = listings[tokenId];
        require(listing.seller == msg.sender, "Only the seller can cancel the listing");
        require(listing.isActive, "Listing is not active");
        
        listing.isActive = false;
        
        emit NFTListingCancelled(tokenId, msg.sender);
    }
    
    /**
     * @dev Updates the marketplace fee percentage
     * @param newFeePercentage The new fee percentage (in basis points)
     */
    function updateMarketplaceFee(uint256 newFeePercentage) public onlyOwner {
        require(newFeePercentage <= 1000, "Fee cannot exceed 10%");
        marketplaceFeePercentage = newFeePercentage;
    }
    
    /**
     * @dev Withdraws accumulated marketplace fees
     */
    function withdrawMarketplaceFees() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No fees to withdraw");
        payable(owner()).transfer(balance);
    }
    
    /**
     * @dev Gets all NFTs owned by a specific address
     * @param owner The address to query
     * @return An array of token IDs owned by the address
     */
    function getNFTsByOwner(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](balance);
        
        for (uint256 i = 0; i < balance; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }
        
        return tokenIds;
    }
    
    /**
     * @dev Gets all active listings
     * @return Arrays of token IDs, sellers, and prices
     */
    function getActiveListings() public view returns (
        uint256[] memory, 
        address[] memory, 
        uint256[] memory
    ) {
        uint256 totalSupply = totalSupply();
        uint256 activeCount = 0;
        
        // Count active listings
        for (uint256 i = 1; i <= totalSupply; i++) {
            if (listings[i].isActive) {
                activeCount++;
            }
        }
        
        // Create return arrays
        uint256[] memory tokenIds = new uint256[](activeCount);
        address[] memory sellers = new address[](activeCount);
        uint256[] memory prices = new uint256[](activeCount);
        
        // Fill return arrays
        uint256 index = 0;
        for (uint256 i = 1; i <= totalSupply; i++) {
            if (listings[i].isActive) {
                tokenIds[index] = i;
                sellers[index] = listings[i].seller;
                prices[index] = listings[i].price;
                index++;
            }
        }
        
        return (tokenIds, sellers, prices);
    }
}