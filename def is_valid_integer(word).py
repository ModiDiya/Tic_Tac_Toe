def is_valid_integer(word):
    """Checks if a word is a valid integer (optional + or - followed by digits)."""
    if not word:
        return False
    if word[0] in "+-" and len(word) > 1:  # If first char is + or -, remove it
        word = word[1:]
    return word.isdigit()  # Ensure remaining part is digits only

def count_valid_integers(code):
    """Splits code into words and counts valid integers using match-case."""
    words = []
    word = ""
    
    # Extract words manually to handle special characters
    for char in code:
        match char:
            case "+" | "-" | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9":  
                word += char  # Build potential integer word
            case _:
                if word:  # If a word was built, store it
                    words.append(word)
                    word = ""

    if word:  # Add last word if present
        words.append(word)

    # Count valid integers
    count = 0
    valid_integers = []
    
    for w in words:
        match is_valid_integer(w):
            case True:
                valid_integers.append(w)
                count += 1

    return count, valid_integers

# Sample input text containing code
sample_code = """
int a = 100;
int b = -20;
int c = +30;
int d = 4 + 5;
int e = 007; // Octal
int f = 0xFF; // Hexadecimal
int g = 50;
"""

# Count and display the results
count, numbers = count_valid_integers(sample_code)
print(f"Total valid integer numbers: {count}")
print("Valid integers found:", numbers)
