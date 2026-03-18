import json 
import os 
from datetime import datetime
#attempt, prompt, parsed_propmt, valdiation result
def save_log(attempt_number, prompt, response, result):

    log_file = "validation_logs.json" 

    log_data ={
        "timestamp" : datetime.now().isoformat(),
        "attempt" : attempt_number,
        "prompt" : prompt,
        "parsed_prompt" : response,
        "validation_result" : result.is_valid,
        "error_message": result.msg if not result.is_valid else None
    }

    with open(log_file, "a") as f:
        f.write(json.dumps(log_data) + "\n")
 
