let data_body = document.querySelector(".data-body");
let all_words_data = document.querySelector(".keywords")
let submit = document.querySelector(".submit-btn")
var max_frequency;
var max_frequency_word;
var parent;
var parent_2
var total_word_types = 0
var command = "no"


// hiding the data_body for first time.
data_body.style.display="none";

    // function for the reseting the textarea
       function clear_text() {
        let frequent_words = document.querySelector(".frequent-words")
        frequent_words.removeChild(parent)

        let keywords_data = document.querySelector(".keywords-data")
        keywords_data.removeChild(parent_2)
        
        let input_field = document.querySelector("#text-input")
        input_field.value = "";
        data_body.style.display="none"
        submit.style.display = "block" 
        total_word_types = 0
    }

    // function for the submit btn

        function execution_confirmation() {
            var text_val = document.querySelector("#text-input").value;
            if (text_val.length > 0){
                data_body.style.display="flex"
                total_word_types = 0
                submit.style.display = "none"
                analyze()
            }
        }


    // adding event listeners to the enter button for the execution.
    document.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            execution_confirmation()
        }
    })


    function analyze(){
        text_val = document.querySelector("#text-input").value;

        // total word count execution.
        let total_words = word_count(text_val);

        let word_value = document.querySelector("#word-value");
        word_value.innerHTML = total_words

        // total character count execution.
        let total_char_count = char_count(text_val);

        let char_value = document.querySelector("#char-value")
        char_value.innerHTML = total_char_count

        // most repeated word count execution.
        let most_repeated_word = most_frequency_counter(text_val);

        let repeated_value= document.querySelector("#repeated-value");
        if (most_repeated_word.length>7){
            repeated_value.style.fontSize = "1.4rem"
        }
        repeated_value.innerText = `' ${most_repeated_word.max_frequency_word} ' : ${most_repeated_word.max_frequency} times`;


        // avg reading time execution.
        reading_time_est = avg_reading_time_counter(text_val)

        let rte_value = document.querySelector("#rte-value");
        rte_value.innerHTML = `${reading_time_est} min`

        // avg word length execution.
        let avg_word_length = avg_word_length_counter(text_val)

        let avg_word_length_value = document.querySelector("#avg-word-lenght-value");
        avg_word_length_value.innerHTML = avg_word_length


        // total sentence count execution.
        let total_sentence = calculate_sentence(text_val)
        let sentence_count_card = document.querySelector("#sentence-count")
        
        sentence_count_card.innerText = total_sentence

        // total unique words count execution.
        let unique_words_card = document.querySelector("#unique-words-value")
        unique_words_card.innerText = total_word_types


        // Making data visible.
        if(text_val != ""){
            data_body.style.display="block";
        }
        
    }


    // function for sentence calculation.
    function calculate_sentence(text){
        text.toLowerCase()
        let sentences = text.split(/[.?!]+/).length;
        return sentences - 1
    }

    //function for avg word length.
    function avg_word_length_counter(text) {
        let total_words = word_count(text)
        let total_char = char_count(text)

        // returning the vale of avg word length.
        return Math.round( total_char / total_words )
    } 


    // function for avg reading time.
    function avg_reading_time_counter(text) {
        let text_split = text.split(" ");

        let avg_reading_speed = 200;
        let total_words = text_split.length;

        if (text_split.length < 100) {
            return 0
        }

        return Math.ceil(total_words / avg_reading_speed)
    }

    // function for most repeated words.

    let frequencyCounter = {}

    function most_frequency_counter(text, command) {
        
        text = text.toLowerCase()
        let text_split = text.split(" ")
        let words_len = text_split.length
        var max_frequency = 0
        var max_frequency_word = "";
        frequencyCounter = {}

        text_split.forEach(word => {
            // creating and changing the values in the object.
            if (frequencyCounter[word] && word!="of" && word!="the" && word!="is" && word!="to" && word!="it"){

                frequencyCounter[word]++
            
            } else{
                frequencyCounter[word] = 1;
                total_word_types++
            }

            
            // seprating the most repeated word.
            if (frequencyCounter[word] > max_frequency) {
                max_frequency_word = word
                max_frequency = frequencyCounter[word]
            }
            
        });
        // displaying the frequency of frequent words.
        parent = document.createElement("div")
        parent.className = "keywords"
            for (let word in frequencyCounter) {
            if (frequencyCounter[word] >= 3 ){
                if( word == "–" || word == "0" || word == " " || word == "-"){
                    continue;
                }
                let element = document.createElement('p')
                element.className="keywords-para"
                element.id = 'data-p'
                element.innerText = `${word} : ${frequencyCounter[word]}`
                parent.appendChild(element)
            }
            let data_body_parent = document.querySelector(".frequent-words")
            data_body_parent.appendChild(parent)
        } 
        
        // displaying the keywords.
        let one_percent = Math.ceil(words_len*0.01)
        console.log(one_percent)

        parent_2 = document.createElement("div")
        parent_2.className = "keywords"
        if (words_len >= 200) {
            for(let word in frequencyCounter) {
            if (frequencyCounter[word] > one_percent && word != " " && word != "") {
                let new_element = document.createElement('p')
                new_element.className = "keywords-para"
                new_element.innerText = `${word} : ${frequencyCounter[word]}`
                parent_2.appendChild(new_element)
            }else{
                continue
            }
        }
    }
        
        let data_body_parent_2 = document.querySelector(".keywords-data")
        data_body_parent_2.appendChild(parent_2)



        // checking if the value is empty.
        if (text_split.length == 1 && max_frequency_word === undefined) {
            max_frequency_word = 0
            return max_frequency_word
        }else{
            return {max_frequency_word: max_frequency_word, max_frequency: max_frequency}
        }
    }

    // function for total word count.

    function word_count(text){
        text_split = text.split(" ").length;
        if (text.length === 0){
            return 0
        } else{
            return text_split
        }
        
    }

    // function for total character count.

    function char_count(text) {
        text_split = text.split("");
        let total_char = 0
        for (let i = 0; i < text_split.length; i++){
            if (text_split[i] != " ") {
                total_char++
            }
        }
        return total_char
    }
