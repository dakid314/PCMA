import warnings
warnings.filterwarnings("ignore")
import sys
sys.path.append(".")
sys.path.append("src")
import os
import datetime
import argparse
import json
from hashlib import sha512
from datetime import datetime, timezone
import subprocess
def write_status(msg: str, path_to_dir: str, remove: bool = False):
    if remove == False:
        with open(os.path.join(path_to_dir, msg), "w+", encoding='UTF-8') as f:
            f.write(datetime.now(timezone.utc).strftime('%Y-%m-%dT%H:%M:%SZ'))
    else:
        os.remove(os.path.join(path_to_dir, msg))


def run_pcma(jobid: str, userdir: str, ):
    data_dir = os.path.join(userdir, sha512(
        jobid.encode()).hexdigest())
    
    with open(f'{data_dir}/args.json', 'r', encoding='UTF-8') as f:
        args_ = json.load(f)
    model = args_['model']
    fun = False
    if "4" in model:
        fun = True
    else:
        fun = False
    for value in model:
        if value == "1":
            pips = subprocess.Popen(
                f"{os.environ['Driver_Python_PATH']} -u src/PCMA1.py -r {data_dir} -f {fun}",
                shell=True,
                executable=os.environ['SHELL_PATH'],
                stdout=subprocess.PIPE,
                stdin=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            cstderr = pips.communicate()[1].decode('UTF-8')
            pips.wait()
            d = None
            with open(f'{data_dir}/args.json', 'r', encoding='UTF-8') as f:
                d = json.load(f)
                if 'error' not in d:
                    d['error'] = []
            d['error'].append(cstderr)
            with open(f'{data_dir}/args.json', 'w+', encoding='UTF-8') as f:
                json.dump(d, f)
        elif value == "2":
            pips = subprocess.Popen(
                f"{os.environ['Driver_Python_PATH']} -u src/PCMA2.py -r {data_dir} -f {fun}",
                shell=True,
                executable=os.environ['SHELL_PATH'],
                stdout=subprocess.PIPE,
                stdin=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            cstderr = pips.communicate()[1].decode('UTF-8')
            pips.wait()
            d = None
            with open(f'{data_dir}/args.json', 'r', encoding='UTF-8') as f:
                d = json.load(f)
                if 'error' not in d:
                    d['error'] = []
            d['error'].append(cstderr)
            with open(f'{data_dir}/args.json', 'w+', encoding='UTF-8') as f:
                json.dump(d, f)
        elif value == "3":
            pips = subprocess.Popen(
                f"{os.environ['Driver_Python_PATH']} -u src/PCMAMA.py -r {data_dir} -f {fun}",
                shell=True,
                executable=os.environ['SHELL_PATH'],
                stdout=subprocess.PIPE,
                stdin=subprocess.PIPE,
                stderr=subprocess.PIPE
            )
            cstderr = pips.communicate()[1].decode('UTF-8')
            pips.wait()
            d = None
            with open(f'{data_dir}/args.json', 'r', encoding='UTF-8') as f:
                d = json.load(f)
                if 'error' not in d:
                    d['error'] = []
            d['error'].append(cstderr)
            with open(f'{data_dir}/args.json', 'w+', encoding='UTF-8') as f:
                json.dump(d, f)
            

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', type=str, help='config file',)
    args = parser.parse_args()
    _args_ = None
    with open(args.config, 'r', encoding='UTF-8') as f:
        _args_ = json.load(f)

    
    run_pcma(
        _args_['jobid'],
        os.environ['USER_DIR']
    )
    write_status("makereport.done", os.path.join(os.environ['USER_DIR'], sha512(
        _args_['jobid'].encode()).hexdigest()))
