 // --- Image Slider Script ---
        const images = [
            "https://cdn.pixabay.com/photo/2019/01/31/07/53/man-3966140_640.png",
            "https://cdn.pixabay.com/photo/2020/02/02/03/43/young-4811941_640.png",
            "https://cdn.pixabay.com/photo/2023/10/02/08/17/ai-generated-8288683_640.png",
            "https://cdn.pixabay.com/photo/2019/11/13/03/03/girl-4622410_640.png",
            "https://cdn.pixabay.com/photo/2025/02/21/16/09/ai-generated-9422470_640.png",
            "https://cdn.pixabay.com/photo/2016/06/14/17/16/cello-1457088_640.png",
            "https://cdn.pixabay.com/photo/2025/01/18/19/49/ai-generated-9343113_640.png",
            "https://cdn.pixabay.com/photo/2016/09/06/11/02/womens-1648811_640.png"
        ];

        let current = 0;
        const imageEl = document.getElementById('vectorImage');
        const dotsContainer = document.getElementById('paginationDots');

        // Create dots
        images.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        function showNextImage() {
            // Fade out
            imageEl.style.opacity = 0;

            setTimeout(() => {
                current = (current + 1) % images.length;
                imageEl.src = images[current];

                // Update dots
                dots.forEach(dot => dot.classList.remove('active'));
                dots[current].classList.add('active');

                // Fade in
                imageEl.style.opacity = 1;
            }, 1000);
        }

        setInterval(showNextImage, 3000);

        // --- Sign In Modal Script ---
        const signinModal = document.getElementById("signinModal");

        function openModal() {
            signinModal.style.display = "flex";
        }

        function closeModal() {
            signinModal.style.display = "none";
        }

        // Optional: Close modal when clicking outside the form
        window.addEventListener("click", function (e) {
            if (e.target === signinModal) {
                closeModal();
            }
        });

        // --- Rate Us Popup Script ---
        let selectedEmoji = null;
        const emojis = document.querySelectorAll('.emoji');
        const ratePopup = document.getElementById('ratePopup');
        const rateOverlay = document.getElementById('rateOverlay');
        const feedbackText = document.getElementById('feedbackText');
        const thankYouMsg = document.getElementById('thankYouMsg');

        // New variables for persistence logic
        // Check localStorage on page load to see if feedback has been given before
        let feedbackGiven = localStorage.getItem('feedbackGiven') === 'true';
        let popupTimeoutId = null;
        const POPUP_DELAY = 10000; // Changed to 10 seconds for demonstration

        emojis.forEach(emoji => {
            emoji.addEventListener('click', () => {
                emojis.forEach(e => e.classList.remove('selected'));
                emoji.classList.add('selected');
                selectedEmoji = emoji.textContent;
            });
        });

        function showRatePopup() {
            if (feedbackGiven) {
                return; // Don't show if feedback has already been given (checked from localStorage)
            }
            ratePopup.style.display = 'flex'; // Ensure the popup itself is also flex
            rateOverlay.style.display = 'flex';
        }

        function closeRatePopup() {
            ratePopup.style.display = 'none';
            rateOverlay.style.display = 'none';
            selectedEmoji = null;
            emojis.forEach(e => e.classList.remove('selected'));
            feedbackText.value = '';

            // If feedback not given, set a new timer to show it again
            if (!feedbackGiven) {
                clearTimeout(popupTimeoutId); // Clear any existing timer
                popupTimeoutId = setTimeout(showRatePopup, POPUP_DELAY);
            }
        }

        function submitFeedback() {
            const message = feedbackText.value.trim();
            if (!selectedEmoji || !message) {
                alert("Please select an emoji and write something! 😅");
                return;
            }

            feedbackGiven = true; // Set flag to true
            localStorage.setItem('feedbackGiven', 'true'); // Store in localStorage
            clearTimeout(popupTimeoutId); // Clear any pending popup timers

            showEmojiBurst();
            ratePopup.style.display = 'none';
            rateOverlay.style.display = 'none';

            thankYouMsg.style.display = 'block';
            setTimeout(() => {
                thankYouMsg.style.display = 'none';
            }, 2500); // Display "Thank You" for 2.5 seconds
        }

        function showEmojiBurst() {
            const wrapper = document.getElementById('animationWrapper');
            wrapper.innerHTML = ''; // Clear previous emojis
            const burstEmojis = ['💖', '✨', '🎉', '🥳', '💝', '💗'];
            for (let i = 0; i < 30; i++) {
                const span = document.createElement('span');
                span.className = 'burst-emoji';
                span.textContent = burstEmojis[Math.floor(Math.random() * burstEmojis.length)];
                span.style.left = Math.random() * 100 + 'vw';
                span.style.top = '80vh';
                span.style.animationDelay = Math.random() * 0.3 + 's';
                wrapper.appendChild(span);
            }
        }

        // Initial call to start the popup timer if feedback hasn't been given yet
        if (!feedbackGiven) {
            popupTimeoutId = setTimeout(showRatePopup, POPUP_DELAY);
        }

        // --- Contact Modal Script ---
        const contactModal = document.getElementById("contactModal");
        const contactForm = document.getElementById("contactForm");
        const thankYouMessage = document.getElementById("thankYouMessage");

        function openContactModal() {
            contactModal.style.display = "flex";
            contactForm.style.display = "block"; // Ensure form is visible
            thankYouMessage.classList.add("hidden"); // Ensure thank you message is hidden
        }

        function closeContactModal() {
            contactModal.style.display = "none";
        }

        function submitContactForm(event) {
            event.preventDefault(); // Prevent default form submission

            // Here you would typically send the form data to a server
            // For this example, we'll just simulate success

            contactForm.style.display = "none"; // Hide the form
            thankYouMessage.classList.remove("hidden"); // Show the thank you message

            // Optional: Hide thank you message and close modal after a few seconds
            setTimeout(() => {
                closeContactModal();
            }, 3000); // Hide after 3 seconds
        }

        // Optional: Close contact modal when clicking outside
        window.addEventListener("click", function (e) {
            if (e.target === contactModal) {
                closeContactModal();
            }
        });