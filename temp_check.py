import os
import subprocess

def run_script(script_name):
    print(f"Running {script_name}...")
    try:
        result = subprocess.run(['python', script_name], capture_output=True, text=True)
        print(result.stdout)
        if result.stderr:
            print(f"Errors in {script_name}:")
            print(result.stderr)
    except Exception as e:
        print(f"Failed to run {script_name}: {e}")

if __name__ == "__main__":
    run_script('check_missing_research.py')
    run_script('check_missing_research_full.py')
