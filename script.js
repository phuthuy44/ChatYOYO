

window.addEventListener('DOMContentLoaded',() => {
    
    let fullName=document.querySelector('[name="fullname"]');

    let msgObj=document.querySelector('[name="msg"]');
    let chatForm=document.querySelector('.chatYO form');
    let chatContent=document.querySelector('.msg-content');
    let chatItem;
if(chatForm!==null){
        chatItem=`<div class="chatItem">
        <label for="">{name}</label>
        {msg}
    </div>`;
        if(fullName!==null){
            //when Enter into input
            fullName.addEventListener('change',(e)=>{
                let fullNameAfter=e.target.value;
                if(fullNameAfter.trim()!==''){
                    sessionStorage.setItem('fullNameAfter',fullNameAfter);
                }else{
                    console.log('Dont!');
                }
                
             
            });
            //When load
            if(sessionStorage.getItem('fullNamAfter')!==null){
                fullNameAfter.value=sessionStorage.getItem('fulNameAfter').trim();
            }
        }
        
        chatForm.addEventListener('submit',(e)=>{
            e.preventDefault();
            let fullNameAfter;
            if(fullName!=null){
                 fullNameAfter=fullName.value;
                
            }
            if(msgObj!==null){
            let msg1= msgObj.value;
            if(msg1.trim()==''||fullNameAfter.trim()==''){
                if(msg1.trim()==''){
                   alert('Vui lòng nhập tin nhắn!');
                   
                }else if(fullNameAfter.trim()==''){
                alert('Vui lòng nhập tên!');
                }  
            }else{
               if(chatContent!==null){
                //console.log(msg1);
               //change mes and name;
               let chatItemNew=chatItem.replace('{name}',fullNameAfter).replace('{msg}',msg1);
               let sendMsg= sendMess(fullNameAfter,msg1); 
               
                sendMsg.then(()=>{
                   if(data!=''){
                    chatContent.innerHTML+=chatItemNew;
                    //reset
                    msgObj.value='';
                    msgObj.focus();
                   }
                });
              
            }
            }
            
        }
        });
        //load mess
        setInterval(()=>{
            let messContent= getMess();
        
        messContent.then((data)=>{
            if(data!==''){
                let contentmsg='';
                let dataObj=JSON.parse(data);
                dataObj.forEach((item)=>{
                    let chatItemcontentNew=chatItem.replace('{name}',item.fullname).replace('{msg}',item.msg);
                    contentmsg+=chatItemcontentNew;
                
                });
                if(chatContent!==null && contentmsg.trim()!==" "){
                    chatContent.innerHTML = contentmsg;
                }
                
            }

        });
        
        },1000);
    }
    function sendMess(name,msg){
        return new Promise((success)=>{
            let xhttp= new XMLHttpRequest();
        let currentDate=new Date();
        let createAt=currentDate.getDate()+'/'+currentDate.getMonth()+'/'+currentDate.getFullYear()+' '+currentDate.getHours()+':'+currentDate.getMinutes()+':'+currentDate.getSeconds();
        let dataJSON={
            fullname:name,
            msg:msg,
            create:createAt
        };
        let Dataquery =new URLSearchParams(dataJSON).toString();
        xhttp.open('POST','http://localhost:3300/chatYO',true);
        xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhttp.send(Dataquery);
        xhttp.onload=function(){
            if(this.status==201){
                success(this.response);
            }
        }
        
        });
       
    }
    function getMess(){
       const msgPromise1=new Promise((success)=>{
            let xhttp= new XMLHttpRequest();
            xhttp.open('GET','http://localhost:3300/chatYO',true);
            xhttp.send();
            xhttp.onload=function(){
                if(this.status==200){
                    success(this.response)
                }
            }
        });
        return msgPromise1;
    }
    
});



