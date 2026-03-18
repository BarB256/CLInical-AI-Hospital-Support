'''This module recieves the validated message from the validator and handles the error if one exists. As of right now, the validator is unfinished so this module is not fully finished
from validator import Validatedmsg
from validation_logs import save_log

def handle_validated_message(prompt, max_tries=3):
    attempts = 0
    current_prompt = prompt
    while attempts < max_tries:
        parsed_prompt = parse_llm_output(prompt)
        validation_result = validate_llm_response(parsed_prompt)

        save_log(attempts + 1, current_prompt, parsed_prompt, validation_result)

        if validation_result.is_valid:
            return parsed_prompt
            
        attempts += 1
        print(f"Message is invalid. Attempt {attempts} of {max_tries}. Retrying...")

        current_prompt = f"Fix this error: {validation_result.msg}. Original task: {prompt}"

    return("Maximum validation attempts reached. Validation failed.")
'''    



