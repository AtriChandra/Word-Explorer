const form=document.querySelector('form');
const resultDiv=document.querySelector('.result');

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word)=>{
    try {
        resultDiv.innerHTML= `<i style="color: #808080; font-style: italic;">Fetching Data....................</i>`;
        const response= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        const data= await response.json();
        let definitions=data[0].meanings[0].definitions[0];
        resultDiv.innerHTML=`
        <h2><strong>Word: </strong>${data[0].word}</h2>
        <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning: </strong>${definitions.definition == undefined ? "Not Found" : definitions.definition}</p>
        <p><strong>Example: </strong>${definitions.example == undefined ? "Not Found" : definitions.example}</p>
        <p><strong>Antonyms: </strong>
        `;
    
        if(definitions.antonyms.length==0)
            resultDiv.innerHTML+=`Not Found`;
        else{
            for(let i=0;i<definitions.antonyms.length;i++){
                resultDiv.innerHTML+=`<li>${definitions.antonyms[i]}</li>`;
            }
        }

        resultDiv.innerHTML+=`<p><strong>Synonyms: </strong>`;

        if(definitions.synonyms.length==0)
            resultDiv.innerHTML+=`Not Found`;
        else{
            for(let i=0;i<definitions.synonyms.length;i++){
                resultDiv.innerHTML+=`<li>${definitions.synonyms[i]}</li>`;
            }
        }
    
        resultDiv.innerHTML+=`<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`; 

        
    } catch (error) {
        resultDiv.innerHTML=`<p><strong> Sorry, the word could not be found </strong></p>`;
    }
    
    console.log(data);
}



