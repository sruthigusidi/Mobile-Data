document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector(".style-19");
    const searchBtn = document.querySelector(".style-20");
    const showAllBtn = document.querySelector(".style-67");
    const phoneList = document.querySelector(".style-25");
    const modal = document.querySelector(".style-69");
    const modalContent = document.querySelector(".style-71");
    const modalTitle = document.querySelector(".style-72");
    const modalBrand = document.querySelector(".style-73");
    const modalSlug = document.querySelector(".style-74");
    const modalCloseBtn = document.querySelector(".style-77");

    const fetchPhones = async (query = "") => {
        const apiUrl = `https://openapi.programming-hero.com/api/phones?search=${query}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error("Error fetching phones:", error);
            return [];
        }
    };

    const displayPhones = (phones) => {
        phoneList.innerHTML = "";
        if (phones.length === 0) {
            phoneList.innerHTML = "<p>No phones found. Try a different search term!</p>";
            return;
        }
        phones.forEach(phone => {
            const phoneCard = document.createElement("div");
            phoneCard.classList.add("style-26");
            phoneCard.innerHTML = `
                <figure class="style-27">
                    <img src="${phone.image}" alt="${phone.phone_name}" class="style-28" />
                </figure>
                <div class="style-29">
                    <h2 class="style-30">${phone.phone_name}</h2>
                    <p class="style-31">Brand: ${phone.brand}</p>
                    <div class="style-32">
                        <button class="style-33" onclick="showDetailsHandler('${phone.slug}')">Show Details</button>
                    </div>
                </div>
            `;
            phoneList.appendChild(phoneCard);
        });
    };

    const showDetailsHandler = async (slug) => {
        const apiUrl = `https://openapi.programming-hero.com/api/phone/${slug}`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const phone = data.data;
            modalTitle.textContent = phone.name;
            modalBrand.textContent = `Brand: ${phone.brand}`;
            modalSlug.textContent = `Slug: ${phone.slug}`;
            modalContent.innerHTML = `<img src="${phone.image}" alt="${phone.name}" style="max-width: 200px; border-radius: 10px;">`;
            modal.showModal();
        } catch (error) {
            console.error("Error fetching phone details:", error);
        }
    };

    searchBtn.addEventListener("click", async () => {
        const query = searchInput.value.trim();
        if (query === "") {
            phoneList.innerHTML = "<p>Please enter a search term!</p>";
            return;
        }
        const phones = await fetchPhones(query);
        displayPhones(phones);
    });

    showAllBtn.addEventListener("click", async () => {
        const phones = await fetchPhones();
        displayPhones(phones);
    });

    modalCloseBtn.addEventListener("click", () => {
        modal.close();
    });

    window.showDetailsHandler = showDetailsHandler;
});