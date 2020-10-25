pragma solidity >=0.6.6;

contract MemeCashFactory{
    address[] deployedCampaigns;
    mapping(string=>bool) uploadedImageSHA256;
    
    
    
    
    function createCampaign(string memory _memeHash,string memory _memeSHA) public{
        require(bytes(_memeHash).length!=0  && uploadedImageSHA256[_memeSHA]!=true);
        uploadedImageSHA256[_memeSHA]=true;
        address newCampaign = address(new MemeCash(_memeHash,msg.sender));
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns(address[] memory){
        return deployedCampaigns;
    }
}

contract MemeCash{
    address payable owner;
    string public memeHash;
    uint public totalDonation;
    mapping(address=>bool) public upvoters;
    uint totalUpvotes;
    mapping(address=>bool) public downvoters;
    uint totalDownvotes;
    
    
   constructor(string memory _memeHash,address payable creator) public{
        owner = creator;
        memeHash=_memeHash;
        totalDonation=0;
    }
    
    
    //donation 
    function donate() public payable{
        require(msg.value>0);
        owner.transfer(msg.value);
        totalDonation+=msg.value;
    }
    
    
    //upvoteing logic
     function toggleUpvote() public 
     {
        if(upvoters[msg.sender]==true)
        {
           totalUpvotes--;
           upvoters[msg.sender]=!upvoters[msg.sender];
        }else{
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
     
     
     //downvoteing logic
     function toggleDownvote() public{
         if(downvoters[msg.sender]==true)
          { downvoters[msg.sender]=false;
           totalDownvotes--;}
           
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
}