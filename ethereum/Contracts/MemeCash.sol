pragma solidity >=0.6.6;

contract MemeCashFactory{
    address[] deployedMemes;
    mapping(string=>bool) uploadedImageSHA256;
    mapping(address=>address[]) myMemes;
    address[] myMemeList;

    function createMeme(string memory _memeHash,string memory _memeSHA) public{
        require(bytes(_memeHash).length!=0  && uploadedImageSHA256[_memeSHA]!=true);
        uploadedImageSHA256[_memeSHA]=true;
        address newMeme = address(new MemeCash(_memeHash,msg.sender));
        deployedMemes.push(newMeme);
        myMemeList = myMemes[msg.sender];
        myMemeList.push(newMeme);
        myMemes[msg.sender]=myMemeList;
    }
    
    function getDeployedMemes() public view returns(address[] memory){
        return deployedMemes;
    }
    
    function getMyMemes() public view returns(address[] memory){
        return myMemes[msg.sender];
    }
}

contract MemeCash{
    address payable private owner;
    string private memeHash;
    mapping(address=>bool) private upvoters;
    uint private totalUpvotes;
    mapping(address=>bool) private downvoters;
    uint private totalDownvotes;
    
    constructor(string memory _memeHash,address payable creator) public{
        owner = creator;
        memeHash = _memeHash;
    }
    
    //donation 
    function donate() public payable{
        require(msg.value>0);
        require(msg.sender!=owner);
        // owner.transfer(msg.value);
    }
    
    //upvoting logic
    function toggleUpvote() public {
        if(upvoters[msg.sender]==true)
        {
            totalUpvotes--;
            upvoters[msg.sender]=!upvoters[msg.sender];
        }
        else{
            if(downvoters[msg.sender]==true){
                totalDownvotes--;
                downvoters[msg.sender]=false;
            }
            upvoters[msg.sender]=true;
            totalUpvotes++;
        }
    }

    function getTotalUpvotes() public view returns(uint){
        return totalUpvotes;
    }

    function upvoted() public view returns(bool){
        if(upvoters[msg.sender] != true )
        return false;
        return true;
    }
     
    //downvoting logic
    function toggleDownvote() public{
        if(downvoters[msg.sender]==true)
        {
            downvoters[msg.sender]=false;
            totalDownvotes--;
        }
        else{
            if(upvoters[msg.sender]==true){
                totalUpvotes--;
                upvoters[msg.sender]=false;
            }
            downvoters[msg.sender]=true;
            totalDownvotes++;
        }
    }

    function getTotalDownvotes() public view returns(uint){
        return totalDownvotes;
    }

    function downvoted() public view returns(bool){
        if(downvoters[msg.sender] != true )
        return false;
        return true;
    }

    function getTotalDonation() public view returns (uint){
        return address(this).balance;
    }

    function getMemeHash() public view returns(string memory){
        return memeHash;
    }
}