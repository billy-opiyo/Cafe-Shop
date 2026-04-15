;(function () {
	// Mobile menu toggle
	const toggleBtn = document.getElementById("menuToggle")
	const navLinks = document.getElementById("navLinks")
	if (toggleBtn) {
		toggleBtn.addEventListener("click", () => {
			if (navLinks.style.display === "flex") {
				navLinks.style.display = "none"
			} else {
				navLinks.style.display = "flex"
				navLinks.style.flexDirection = "column"
				navLinks.style.position = "absolute"
				navLinks.style.top = "80px"
				navLinks.style.left = "0"
				navLinks.style.width = "100%"
				navLinks.style.background = "#fef8f0"
				navLinks.style.padding = "20px"
				navLinks.style.boxShadow = "0 20px 20px rgba(0,0,0,0.05)"
			}
		})
	}

	// Menu data with categories
	const menuItems = [
		{
			cat: "breakfast",
			name: "Shakshuka",
			desc: "Poached eggs in spicy tomato sauce, feta",
			price: "$14",
			img: "IMG/Shakshuka.jpg",
		},
		{
			cat: "breakfast",
			name: "Brioche French Toast",
			desc: "Caramelized bananas, maple butter",
			price: "$16",
			img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=400&fit=crop",
		},
		{
			cat: "lunch",
			name: "Wood-fired Burger",
			desc: "Angus beef, smoked cheddar, aioli",
			price: "$22",
			img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&fit=crop",
		},
		{
			cat: "lunch",
			name: "Kale Caesar",
			desc: "Parmesan, croutons, lemon",
			price: "$13",
			img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&fit=crop",
		},
		{
			cat: "dinner",
			name: "Grilled Branzino",
			desc: "Herb salsa verde, roasted veg",
			price: "$32",
			img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=400&fit=crop",
		},
		{
			cat: "dinner",
			name: "Braised Short Rib",
			desc: "Polenta, gremolata",
			price: "$36",
			img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&fit=crop",
		},
		{
			cat: "drinks",
			name: "Smoked Old Fashioned",
			desc: "Bourbon, maple, bitters",
			price: "$15",
			img: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&fit=crop",
		},
		{
			cat: "drinks",
			name: "Hibiscus Spritz",
			desc: "Prosecco, hibiscus, lime",
			price: "$12",
			img: "https://images.unsplash.com/photo-1560512823-829485b8bf24?w=400&fit=crop",
		},
	]

	const menuGrid = document.getElementById("menuGrid")
	function renderMenu(filterCat = "all") {
		const filtered =
			filterCat === "all"
				? menuItems
				: menuItems.filter((i) => i.cat === filterCat)
		menuGrid.innerHTML = filtered
			.map(
				(item) => `
        <div class="menu-item">
          <div class="menu-img" style="background-image: url('${item.img}');"></div>
          <div class="menu-info">
            <div class="menu-title">${item.name}</div>
            <div class="menu-desc">${item.desc}</div>
            <div class="price">${item.price}</div>
          </div>
        </div>
      `,
			)
			.join("")
	}
	renderMenu()

	// Category filter buttons
	const catBtns = document.querySelectorAll(".cat-btn")
	catBtns.forEach((btn) => {
		btn.addEventListener("click", function () {
			catBtns.forEach((b) => b.classList.remove("active"))
			this.classList.add("active")
			const cat = this.dataset.cat
			renderMenu(cat)
		})
	})

	// Reservation date min
	const today = new Date().toISOString().split("T")[0]
	const dateInput = document.getElementById("reserveDate")
	if (dateInput) dateInput.min = today

	// Reservation form simulation
	const form = document.getElementById("reservationForm")
	const feedbackDiv = document.getElementById("reserveFeedback")
	const feedbackMsg = document.getElementById("feedbackMsg")

	form.addEventListener("submit", (e) => {
		e.preventDefault()
		const name =
			form.querySelector('input[placeholder*="Full name"]').value || "Guest"
		const date = dateInput.value
		const timeSelect = form.querySelectorAll("select")[0]
		const time = timeSelect.options[timeSelect.selectedIndex].text
		feedbackMsg.innerText = `🎉 Thank you, ${name}! Your table for ${date} at ${time} is confirmed. A demo confirmation has been sent.`
		feedbackDiv.style.display = "block"
		feedbackDiv.scrollIntoView({ behavior: "smooth", block: "nearest" })
	})

	// Newsletter dummy
	document
		.querySelector(".newsletter-form .btn")
		?.addEventListener("click", (e) => {
			e.preventDefault()
			const inp = document.querySelector(".newsletter-form input")
			if (inp.value) alert("✨ Subscribed! (demo)")
			else alert("Enter email")
		})

	// smooth scroll
	document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
		anchor.addEventListener("click", function (e) {
			const href = this.getAttribute("href")
			if (href === "#" || href === "") return
			const target = document.querySelector(href)
			if (target) {
				e.preventDefault()
				target.scrollIntoView({ behavior: "smooth" })
				if (window.innerWidth <= 900) navLinks.style.display = "none"
			}
		})
	})

	// Dark Mode Toggle
	const darkModeToggle = document.getElementById("darkModeToggle")
	const moonIcon = document.getElementById("moonIcon")
	const sunIcon = document.getElementById("sunIcon")

	if (darkModeToggle) {
		darkModeToggle.addEventListener("click", () => {
			document.body.classList.toggle("dark-mode")
			if (document.body.classList.contains("dark-mode")) {
				sunIcon.style.display = "block"
				moonIcon.style.display = "none"
			} else {
				sunIcon.style.display = "none"
				moonIcon.style.display = "block"
			}
		})
	}

	// Check for saved preference or system preference
	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
	const savedTheme = localStorage.getItem("theme")

	if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
		document.body.classList.add("dark-mode")
		sunIcon.style.display = "block"
		moonIcon.style.display = "none"
	}
})()
