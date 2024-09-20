from Bio import Entrez
import pandas as pd 
def fetch_taxonomic_info(assembly_accession):
    try:
        Entrez.email = "dakid314@163.com" 
        handle = Entrez.esearch(db="assembly", term=assembly_accession)
        record = Entrez.read(handle)
        if record["Count"] == "0":
            print(f"No records found for assembly accession {assembly_accession}")
            return 1

        assembly_id = record["IdList"][0]
        summary_handle = Entrez.esummary(db="assembly", id=assembly_id)
        summary_record = Entrez.read(summary_handle)
        taxid = summary_record["DocumentSummarySet"]["DocumentSummary"][0]["Taxid"]

        taxonomy_handle = Entrez.efetch(db="taxonomy", id=taxid, retmode="xml")
        taxonomy_record = Entrez.read(taxonomy_handle)
        
        lineage = taxonomy_record[0]["LineageEx"]

        taxonomic_info = {}
        for item in lineage:
            if item["Rank"] in ["phylum", "class", "family", "genus"]:
                if item["ScientificName"]=='':
                    taxonomic_info[item["Rank"]] = '_'
                taxonomic_info[item["Rank"]] = item["ScientificName"]

        return taxonomic_info
    except:
        return 1

df = pd.read_excel('new.xlsx')
assembly_accession = list(df['# assembly_accession'])
p = list(df['Phylum'])
for a in range(len(p)):
    if pd.isna(p[a]):

        ass = assembly_accession[a]
        taxonomic_info = fetch_taxonomic_info(ass)
        if taxonomic_info ==1:
            with open('new_error_log.txt', 'a') as f:
                f.write(f"Error occurred at index {a}: {ass}\n")
            continue
        else :  
            for rank, name in taxonomic_info.items():
                df.loc[a,rank.capitalize()] = name
                print(f"{rank.capitalize()}: {name}")
df.to_excel('new2.xlsx',index=False)