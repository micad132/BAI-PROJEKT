import yaml

def load_yml(path):
    try:
        with open(path, 'r', encoding='utf-8') as file:
            output = yaml.safe_load(file)
        return output
    except FileNotFoundError as e:
        return e
