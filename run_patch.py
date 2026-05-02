import os
import subprocess

# Run the patch script
result = subprocess.run(['python', 'patch_catalog.py'], capture_output=True, text=True)
print(result.stdout)
if result.stderr:
    print(result.stderr)
