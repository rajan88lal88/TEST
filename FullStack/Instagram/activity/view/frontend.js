const search=document.querySelector(".search");
const input=document.querySelector("input");
const p=document.querySelector(".p-entry");
const fEntry=document.querySelector(".f-entry");
const rEntry=document.querySelector(".r-entry");

search.addEventListener("click",function (e){
    e.preventDefault();
    populateProfile(input.value);
    populateFollower(input.value);
    console.log("request sent");
})
async function populateProfile(id){
    let { data } =  await axios.get(`api/v1/users/${id}`);
    console.log(data);
    let user=data.user;
    let {handle,p_img_url,is_pending}=user;
    p.innerHTML=`<p>Email id : ${email_id}<\p><p>Handle : ${handle}<\p>`;

}
async function populateFollower(id){
    let {data} =  await axios.get(`api/v1/users/fr/${id}`);
    console.log(data);
    let arr=data.message;
    for(let i=0;i<arr.length;i++){
        let fObj=arr[i];

        let div=AddToUI(fObj);
        if (fObj.is_pending) {
            rEntry.appendChild(div);
            let p = document.createElement("p");
            p.innerText = "Accept : Reject"
            div.appendChild(p);
        } else {
            // img 
            // handle
            fEntry.appendChild(div);
        }
    }

}
function AddToUI(followerObj) {
    let div = document.createElement("div");
    let img = document.createElement("img");
    let handleSpan = document.createElement("span");
    handleSpan.textContent = followerObj.handle;
    img.src = followerObj.p_img_url == null ? "default.png" :
     followerObj.p_img_url;
    img.height="40";
    div.appendChild(img);
    div.appendChild(handleSpan);
    return div;
}
