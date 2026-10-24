const barBtn = document.querySelector("#barBtn");
const closeBtn = document.querySelector("#closeBtn");
const overlay = document.querySelector("#overlay");
const sidebar = document.querySelector("#sidebar");

function openSideBar() {
    sidebar.classList.remove("translate-x-full");
    overlay.classList.remove("opacity-0", "pointer-events-none");
}
function closeSidebar() {
    sidebar.classList.add("translate-x-full");
    overlay.classList.add("opacity-0", "pointer-events-none");
}

barBtn.addEventListener('click', openSideBar);
closeBtn.addEventListener('click', closeSidebar);
overlay.addEventListener('click', closeSidebar);

tsParticles.load("tsparticles", {
    background: {
        color: {
            value: "#000000"
        }
    },
    particles: {
        number: {
            value: 50
        },
        opacity: {
            value: 0.2
        },
        color: {
            value: ["#ffffff", "#b0afae"]
        },
        size: {
            value: 1.5,
        },
        move: {
            enable: true,
            straight: false,
            direction: "bottom",
            speed: 0.7,
            outModes: {
                default: "out"
            },
        },
        shape: {
            type: "circle",
        },
    },
});


const lang = [
    {
        logo: "Re",
        name: "React",
        description: "A JavaScript library for building user interfaces.",
        type: "Framework",
    },
    {
        logo: "Gs",
        name: "GSAP",
        description: "High-performance JavaScript animation library.",
        type: "Animation",
    },
    {
        logo: "Tw",
        name: "Tailwind CSS",
        description: "A utility-first CSS framework.",
        type: "CSS",
    },
    {
        logo: "3D",
        name: "Three.js",
        description: "Production-ready motion library for React.",
        type: "Animation"
    },
    {
        logo: "Ax",
        name: "Axios",
        description: "Production-ready motion library for React.",
        type: "Library"
    },
    {
        logo: "Fm",
        name: "Framer Motion",
        description: "Production-ready motion library for React.",
        type: "Animation",
    },

]
const getInput = document.querySelector("#search");
const flexcolDiv = document.querySelector(".inputDiv");
const installationDiv = document.querySelector(".installationDiv")
function renderCards(arr) {
    flexcolDiv.innerHTML = arr.map(item => `<div class="flex flex-row items-center mt-4 gap-4 border border-bcolor bg-[#101010] rounded-xl p-2">
                                    <div class="bg-[#141313] h-12 w-14 rounded-md flex justify-center items-center"><span
                                            class="text-base font-medium text-orange">${item.logo}</span></div>
                                    <div class="flex flex-col md:flex-row gap-2 justify-between w-full md:items-center">
                                        <div class="flex flex-col justify-center">
                                            <span class="font-semibold text-white">${item.name}</span>
                                            <span class="text-xs font-poppins font-light">${item.description}</span>
                                        </div>
                                        <div class="hidden md:flex items-center text-center">
                                            <span
                                                class="text-xs font-poppins h-auto py-0.5 w-24 border border-bcolor rounded-full">${item.type}</span>
                                        </div>
                                    </div>
                                </div>`).join("")
}
getInput.addEventListener('input', () => {
    let value = getInput.value.trim().toLowerCase();
    let filtered = lang.filter(item => item.name.toLowerCase().includes(value))
    renderCards(filtered)
});
const buttons = [
    { id: "#css", type: "CSS" },
    { id: "#allBtn", type: "All" },
    { id: "#fwork", type: "Framework" },
    { id: "#lib", type: "Library" },
    { id: "#animation", type: "Animation" }
]
buttons.forEach(({ id, type }) => {
    const btn = document.querySelector(id);
    if (!btn) return;
    btn.addEventListener('click', () => {
        buttons.forEach(b => {
            document.querySelector(b.id)?.classList.replace("bg-orange", "bg-card");
        })
        btn.classList.replace("bg-card", "bg-orange");
        if (type === "All") {
            renderCards(lang)
        } else {
            let filtered = lang.filter(item => item.type === type);
            renderCards(filtered)
        }
    })
});
renderCards(lang);

const logoImg = document.querySelector("#logo");
logoImg.addEventListener('click', () => {
    logoImg.classList.add("rotate-180")
    setTimeout(() => {
        logoImg.classList.remove("rotate-180")
    }, 1000);
});

async function searchPackages(question) {
    const API_KEY = "API_KEY";

    const resp = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": API_KEY
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `You are a helpful JavaScript package assistant.
Explain how to install and use the requested package.
Give:
1. Installation command
2. Basic usage example
3. Required import statement
4. Official documentation link

User question: ${question}`
                            }
                        ]
                    }
                ]
            })
        }
    );

    const data = await resp.json();

    if (!resp.ok) {
        throw new Error(data.error?.message || `HTTP ${resp.status}`);
    }

    const answer = data.candidates?.[0]?.content?.parts
        ?.map(part => part.text || "")
        .join("\n");

    console.log(answer || "No answer returned by Gemini.");
    return answer;
}

const tsBtn = document.querySelector("#ts")
const twailBtn = document.querySelector("#tailwind")
const reactBtn = document.querySelector("#react")
const gsapBtn = document.querySelector("#gsap")

twailBtn.click()

async function showInstallation(question) {
    installationDiv.textContent = "Generating answer...";

    try {
        const answer = await searchPackages(question);
        installationDiv.innerHTML = marked.parse(answer);
    } catch (error) {
        console.error(error);
        installationDiv.textContent =
            "Failed to generate answer. Please try again.";
    }
}
showInstallation("Explain how to install Tailwind CSS");

tsBtn.addEventListener("click", () => {
    showInstallation("Explain how to install TypeScript");
    toaddClass(tsBtn,reactBtn,twailBtn,gsapBtn)
});

twailBtn.addEventListener("click", () => {
    showInstallation("Explain how to install Tailwind CSS");
    toaddClass(twailBtn,tsBtn,reactBtn,gsapBtn)
});

reactBtn.addEventListener("click", () => {
    showInstallation("Explain how to install React");
    toaddClass(reactBtn,gsapBtn,tsBtn,twailBtn)
});

gsapBtn.addEventListener("click", () => {
    showInstallation("Explain how to install GSAP");
    toaddClass(gsapBtn,reactBtn,twailBtn,tsBtn)
});
function toaddClass(btn1,btn2,btn3,btn4){
    btn1.classList.replace("bg-card","bg-orange")
    btn2.classList.replace("bg-orange","bg-card")
    btn3.classList.replace("bg-orange","bg-card")
    btn4.classList.replace("bg-orange","bg-card")
}