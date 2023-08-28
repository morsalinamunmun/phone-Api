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
        console.log(phone)
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
    console.log('show', id)
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json()
    console.log(data);
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
