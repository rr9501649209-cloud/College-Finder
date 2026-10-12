
const url = "http://universities.hipolabs.com/search?name="  ;

let p = document.querySelector("#res") ;

let btn = document.querySelector("button") ;
btn.addEventListener("click" , async ()=>{
    let country = document.querySelector("input").value;
    if(!country){
        p.innerHTML = "<p>Please enter a country name.</p>" ;
        return ;
    }
    console.log(country) ;
    getColleges(country) ;
});

async function  getColleges(country) {
    try{
       p.innerHTML = "<p>Loading colleges...</p>";
       
      let res = await axios.get(url+country) ;

      let colleges = res.data ;

      p.innerHTML = "" ;

      console.log(res) ;

      if(colleges.length===0){
        p.innerHTML = "<p>No colleges found. Try another search.</p>";
        return ;
      }

      for(let college of colleges){
        let card = document.createElement("div") ;
        card.className = "college-card" ;

        let name = document.createElement("h3") ;
        name.innerText = college.name ;

        let countryName = document.createElement("p");
        countryName.innerText = "Country: " + college.country;

        let state = document.createElement("p");
        state.innerText =  "State: " + (college["state-province"] || "Not available");

        let website = document.createElement("a");
        let websiteUrl = college.web_pages?.[0];

        if (websiteUrl) {
            website.href = websiteUrl;
            website.target = "_blank";
            website.rel = "noopener noreferrer";
            website.innerText = "Visit College Website ↗";
        }else{
            website.innerText = "Website not available";
        }
        card.append(name, countryName, state, website);
        p.appendChild(card);
      }
     // each res.data is a object and we know the method of the threding
    }catch(e){
       console.log("The error is -->",e) ;
    }
}





