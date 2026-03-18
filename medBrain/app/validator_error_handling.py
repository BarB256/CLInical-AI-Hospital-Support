'''This module recieves the validated message from the validator and handles the error if one exists. As of right now, the validator is unfinished so this module is not fully finished
from validator import Validatedmsg

def handle_validated_message(prompt, max_tries=3):
    attempts = 0
    current_prompt = prompt
    while attempts < max_tries:
        parsed_prompt = parse_llm_output(prompt)
        validation = validate_llm_response(parsed_prompt)

        save_log(attempts + 1, current_prompt, parsed_prompt, validation)

        if validation.is_valid:
            return parsed_prompt
            
        attempts += 1
        print(f"Message is invalid. Attempt {attempts} of {max_tries}. Retrying...")

        current_prompt = f"Fix this error: {validation.msg}. Original task: {prompt}"

    print("Maximum validation attempts reached. Validation failed.")
'''    



