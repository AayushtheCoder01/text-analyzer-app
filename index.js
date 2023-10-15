let data_body = document.querySelector(".data-body");
    data_body.style.display="none";

    function analyze(){
        let text_val = document.querySelector("#text-input").value;

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
        repeated_value.innerHTML = most_repeated_word;


        // avg reading time execution.
        reading_time_est = avg_reading_time_counter(text_val)

        let rte_value = document.querySelector("#rte-value");
        rte_value.innerHTML = `${reading_time_est} min`

        // avg word length execution.
        let avg_word_length = avg_word_length_counter(text_val)

        let avg_word_length_value = document.querySelector("#avg-word-lenght-value");
        avg_word_length_value.innerHTML = avg_word_length


        // Making data visible.
        data_body.style.display="block";


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
        let avg_reading_speed = 225;

        let total_words = text_split.length;

        return Math.ceil(total_words / avg_reading_speed)
    }

    // function for most repeated words.
    let frequencyCounter = {}
    let max_frequency = 0

    function most_frequency_counter(text) {
        let max_frequency_word = '';
        text.toLowerCase()
        let text_split = text.split(" ")

        text_split.forEach(word => {
            // creating and changing the values in the object.
            if (frequencyCounter[word]){
                frequencyCounter[word]++
            } else{
                frequencyCounter[word] = 1;
            }

            // seprating the most repeated word.
            if (frequencyCounter[word] > max_frequency) {
                max_frequency_word = word
                max_frequency = frequencyCounter[word]
            }
            // checking if the value is empty.
            if (text_split == "") {
                max_frequency_word = "0"
                return max_frequency_word
            }
        });
        return max_frequency_word
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