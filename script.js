document.addEventListener('DOMContentLoaded', () => {
    const questionTextElement = document.getElementById('question-text');
    const optionsAreaElement = document.getElementById('options-area');
    const resultAreaElement = document.getElementById('result-area');
    const resultTextElement = document.getElementById('result-text');
    const restartButton = document.getElementById('restart-button');
    const decisionAreaElement = document.getElementById('decision-area');

    const flowchart = {
        START: {
            question: "Welcome! What type of climate do you prefer for your trip?",
            options: [
                { text: "Cold", next: "COLD_CLIMATE_PATH_SCENERY" },
                { text: "Hot", next: "HOT_CLIMATE_PATH_SCENERY" }
            ]
        },
        COLD_CLIMATE_PATH_SCENERY: {
            question: "For a cold climate trip to Eastern Europe, do you prefer Mountains or Cities?",
            options: [
                { text: "Mountains", next: "BUDGET_QUERY_COLD_MOUNTAINS" },
                { text: "Cities", next: "BUDGET_QUERY_COLD_CITIES" }
            ]
        },
        BUDGET_QUERY_COLD_MOUNTAINS: {
            question: "Regarding your mountain trip in Eastern Europe, do you have a high budget?",
            options: [
                { text: "Yes (High Budget)", result: "Russia - Moscow" },
                { text: "No (Not High Budget)", result: "Russia - Tolyatti" }
            ]
        },
        BUDGET_QUERY_COLD_CITIES: {
            question: "Regarding your city trip in Eastern Europe, do you have a high budget?",
            options: [
                { text: "Yes (High Budget)", result: "Russia - Moscow" },
                { text: "No (Not High Budget)", result: "Russia - Tolyatti" }
            ]
        },
        HOT_CLIMATE_PATH_SCENERY: {
            question: "For a hot climate trip to Africa, do you prefer Seaside or Forest?",
            options: [
                { text: "Seaside", next: "BUDGET_QUERY_HOT_SEASIDE" },
                { text: "Forest", next: "BUDGET_QUERY_HOT_FOREST" }
            ]
        },
        BUDGET_QUERY_HOT_SEASIDE: {
            question: "Regarding your seaside trip in Africa, do you have a low budget?",
            options: [
                { text: "Yes (Low Budget)", result: "Africa - Uganda" },
                { text: "No (Not Low Budget)", result: "Africa - Nigeria" }
            ]
        },
        BUDGET_QUERY_HOT_FOREST: {
            question: "Regarding your forest trip in Africa, do you have a low budget?",
            options: [
                { text: "Yes (Low Budget)", result: "Africa - Uganda" },
                { text: "No (Not Low Budget)", result: "Africa - Nigeria" }
            ]
        }
    };

    let currentStateKey = 'START';

    function renderState(stateKey) {
        const state = flowchart[stateKey];
        if (!state) {
            console.error("Error: State not found -", stateKey);
            displayResult("An error occurred. Please restart."); // Generic error
            return;
        }

        questionTextElement.textContent = state.question;
        optionsAreaElement.innerHTML = ''; // Clear previous options

        state.options.forEach(optionData => {
            const button = document.createElement('button');
            button.textContent = optionData.text;
            button.addEventListener('click', () => {
                // Visual feedback: briefly change style on click
                button.style.backgroundColor = '#2471a3'; // Darker active color
                setTimeout(() => { // Revert after a short delay
                    button.style.backgroundColor = ''; // Revert to CSS defined
                }, 150);

                if (optionData.next) {
                    currentStateKey = optionData.next;
                    renderState(currentStateKey);
                } else if (optionData.result) {
                    displayResult(optionData.result);
                }
            });
            optionsAreaElement.appendChild(button);
        });
    }

    function displayResult(destination) {
        decisionAreaElement.classList.add('hidden');
        resultAreaElement.classList.remove('hidden');
        resultTextElement.innerHTML = `We recommend: <strong>${destination}</strong>.<br>Next step: book a flight.<br>Have a safe trip! (End)`;
    }

    restartButton.addEventListener('click', () => {
        decisionAreaElement.classList.remove('hidden');
        resultAreaElement.classList.add('hidden');
        currentStateKey = 'START';
        renderState(currentStateKey);
    });

    // Initial render
    renderState(currentStateKey);
});