function next(button) {
    //Find components
    let slider_id = button.getAttribute("data-slider-for");
    let target_slider = document.getElementById(slider_id);
    let current_card = target_slider.getAttribute("data-slider-current");
    let sliding_window = target_slider.querySelector(".sliding-window");
    let cards = sliding_window.querySelectorAll("[data-slider-scope='card']");
    let card_width = cards[0].clientWidth + 16; //16px is the gap

    //Update current card
    current_card++;
    if (current_card >= cards.length - 1 - sliding_window.clientWidth / card_width) {
        button.disabled = true;
    }
    target_slider.setAttribute("data-slider-current", current_card);

    //Enable other button
    let other_button = target_slider.querySelector("button.previous");
    other_button.disabled = false;

    //Slide
    sliding_window.style.transform = "translateX(-" + current_card * card_width + "px)";
}

function previous(button) {
    //Find components
    let slider_id = button.getAttribute("data-slider-for");
    let target_slider = document.getElementById(slider_id);
    let current_card = target_slider.getAttribute("data-slider-current");
    let sliding_window = target_slider.querySelector(".sliding-window");
    let cards = sliding_window.querySelectorAll("[data-slider-scope='card']");
    let card_width = cards[0].clientWidth + 16; //16px is the gap

    //Update current card
    current_card--;
    if (current_card == 0) {
        button.disabled = true;
    }
    target_slider.setAttribute("data-slider-current", current_card);

    //Enable other button
    let other_button = target_slider.querySelector("button.next");
    other_button.disabled = false;

    sliding_window.style.transform = "translateX(-" + current_card * card_width + "px)";
}