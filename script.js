// Array of research-backed prompts for goal setting
const prompts = [
    "What is your biggest goal for this month?",
    "What small habit can you change to reach your goals?",
    "Describe the person you want to become.",
    "What is one major obstacle standing in your way?",
    "How will you measure your success?",
    "What daily actions can you take to get closer to your goal?",
    "What is a specific and measurable goal you want to achieve within the next 6 months?",
    "Why is this goal important to you? How will achieving it improve your life?",
    "What steps can you take this week to start working towards this goal?",
    "What resources or support do you need to achieve this goal?",
    "How will you overcome potential obstacles or setbacks along the way?",
    "How will you know when you’ve reached your goal? What is the clear outcome you expect?",
    "What daily or weekly habits can you implement to support your goal?",
    "How will you reward yourself once you reach your goal?",
    "What is the smallest step you can take right now to make progress toward this goal?",
    "How will achieving this goal affect your long-term life vision?",
    "How does this goal align with your personal values?",
    "What distractions or time-wasting activities do you need to avoid to stay on track?",
    "What past achievements can you draw confidence from as you pursue this goal?",
    "How will you break this goal into manageable sub-goals or milestones?",
    "What will you do to stay motivated during difficult times?",
    "If this goal takes longer than expected, how will you stay committed?",
    "What limiting beliefs do you have that may stop you from achieving this goal? How can you challenge them?",
    "How will achieving this goal impact others in your life?",
    "What personal strengths can you leverage to achieve this goal?",
    "What is the worst-case scenario if you don’t achieve this goal? How would you recover from it?"
];

let currentPromptIndex = 0;

// Function to load the next prompt
function getNextPrompt() {
    if (currentPromptIndex < prompts.length) {
        document.getElementById("prompt").innerText = prompts[currentPromptIndex];
        document.getElementById("response").value = getSavedResponse(currentPromptIndex);
        currentPromptIndex++;
    } else {
        document.getElementById("prompt").innerText = "You have completed all the prompts!";
        document.getElementById("response").style.display = 'none';
        document.getElementById("submitBtn").style.display = 'none';
        document.getElementById("downloadPdfBtn").style.display = 'inline'; // Show download button
    }
}

// Function to save response to localStorage
function saveResponse() {
    const response = document.getElementById("response").value;
    if (response) {
        localStorage.setItem(`response${currentPromptIndex - 1}`, response);
        alert("Response saved!");
    } else {
        alert("Please write your response.");
    }
}

// Function to retrieve saved response from localStorage
function getSavedResponse(promptIndex) {
    return localStorage.getItem(`response${promptIndex}`) || '';
}

// Function to delete a specific response
function deleteResponse(promptIndex) {
    localStorage.removeItem(`response${promptIndex}`);
    alert(`Response for Prompt ${promptIndex + 1} deleted!`);
    viewResponses(); // Refresh the displayed responses after deletion
}

// Function to view all saved responses with delete buttons
function viewResponses() {
    const savedResponsesDiv = document.getElementById("savedResponses");
    savedResponsesDiv.innerHTML = ""; // Clear any existing content

    let hasResponses = false;

    for (let i = 0; i < prompts.length; i++) {
        const savedResponse = localStorage.getItem(`response${i}`);
        if (savedResponse) {
            hasResponses = true;
            const responseElement = document.createElement("p");
            responseElement.innerHTML = `
                <strong>Prompt ${i + 1}:</strong> ${prompts[i]} <br>
                <strong>Your response:</strong> ${savedResponse} 
                <button class="deleteBtn" onclick="deleteResponse(${i})">Delete</button>
            `;
            savedResponsesDiv.appendChild(responseElement);
        }
    }

    if (!hasResponses) {
        savedResponsesDiv.innerHTML = "<p>No responses saved yet.</p>";
    }

    savedResponsesDiv.style.display = 'block'; // Show the responses section
}

// Function to download responses as a PDF
function downloadPdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    let yPos = 10; // Starting position for the text
    doc.setFontSize(12);
    
    for (let i = 0; i < prompts.length; i++) {
        const savedResponse = localStorage.getItem(`response${i}`);
        if (savedResponse) {
            // Add prompt
            doc.text(`Prompt ${i + 1}: ${prompts[i]}`, 10, yPos);
            yPos += 10; // Move to the next line
            
            // Add user response
            doc.text(`Your response: ${savedResponse}`, 10, yPos);
            yPos += 20; // Space between entries

            // If reaching the end of the page, create a new page
            if (yPos > 270) {
                doc.addPage();
                yPos = 10;
            }
        }
    }

    // Save the PDF
    doc.save('Goal_Setting_Responses.pdf');
}

// Load the first prompt when the page loads
document.addEventListener("DOMContentLoaded", function() {
    getNextPrompt();
});
