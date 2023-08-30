const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    //console.log(data.data);
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    //console.log(phones)
    const cardContainer = document.getElementById('card-container')
    //clear phone container cards before search
    cardContainer.textContent = '';
    //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container')
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    //display only fast 12 phones
    if(!isShowAll){
        phones = phones.slice(0, 12);
    }
    phones.forEach(phone => {
        //console.log(phone)
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card', 'bg-gray-100', 'shadow-xl', 'p-5', 'text-center');
        //cardDiv.classList = `card w-96 bg-gray-100 shadow-xl`;
        cardDiv.innerHTML = `
        <figure><img src="${phone.image}" alt="Phones" /></figure>
                <div class="card-body">
                  <h2 class="card-title flex mx-auto">${phone.phone_name}</h2>
                  <p>If a dog chews shoes whose shoes does he choose?</p>
                  <div class="card-actions justify-center">
                    <button onclick="showDetails('${phone.slug}')" class="btn btn-primary ">Show Details</button>
                  </div>
                </div>  
        `;
        cardContainer.appendChild(cardDiv);
    });
    loadingShow(false);
}

const showDetails = async (id) =>{
    //console.log('show', id)
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json()
    const phone = data.data;
    showPhoneDetails(phone);
}
const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
    <img src="${phone.image}" alt=""/>
    <p><span class="font-bold">Storage:</span> ${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Display Size:</span> ${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">ChipSet:</span> ${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold">Memory:</span> ${phone?.mainFeatures?.memory}</p>
    <p><span class="font-bold">Slug:</span> ${phone?.slug}</p>
    <p><span class="font-bold">Release Date:</span> ${phone?.releaseDate}</p>
    <p><span class="font-bold">Brand:</span> ${phone?.brand}</p>
    <p><span class="font-bold">GPS:</span> ${phone?.others?.GPS || 'No GPS'}</p>
    `
    //showDetailContainer.appendChild(showDetailContainer);
    show_details_modal.showModal()
}

const handelSearch = (isShowAll) =>{
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadingShow(true);
    loadPhone(searchText, isShowAll);
}

const loadingShow = (isLoading) =>{
    const loadingDotted = document.getElementById('loading');
    if(isLoading){
        loadingDotted.classList.remove('hidden');
    }else{
        loadingDotted.classList.add('hidden')
    }
}

const showAll = (isShowAll) =>{
    handelSearch(true);
}
