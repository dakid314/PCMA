from pcma.pcpcma import pcpcma
import argparse
def main(output_dir,is_func_anal):
    pcpcma(
        output_dir = f'{output_dir}/pcmama',
        Bacteria_dir = f'{output_dir}/Bacteria.csv',
        Metabolite_dir = f'{output_dir}/Metabolite.csv',
        Diagnosis_dir = f'{output_dir}/Diagnosis.csv',
        is_func_anal=is_func_anal,
        func_anal_file=f'{output_dir}/labelFile.csv'
    )


    
if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("-r","--data_dir") 
    parser.add_argument("-f", "--fun", default=False)
    args = parser.parse_args()
    
    main(args.data_dir,args.fun)
