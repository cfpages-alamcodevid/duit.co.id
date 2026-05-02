import subprocess
result = subprocess.run(['python', 'update_catalog_tmp.py'], capture_output=True, text=True)
print(result.stdout)
if result.stderr:
    print(result.stderr)
