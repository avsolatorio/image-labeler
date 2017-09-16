from flask import Flask
from flask_restful import Resource, Api, reqparse

import glob
import pandas as pd
import json
import os
import sys


app = Flask(__name__)
api = Api(app)

DATA_PATH = sys.argv[1]
IMG_PATHS = os.path.join(DATA_PATH, 'img', '*.jpg')
TAG_STORE_FILE = os.path.join(DATA_PATH, 'is_car_tag.dict')

ipaths = glob.iglob(IMG_PATHS)
car_models = pd.DataFrame(
    data = [p for p in ipaths],
    columns = ['img_path']
)

car_models['car_model'] = car_models.img_path.map(lambda s: '-'.join(s.split('/')[-1].split('__')[0].split('-')[1:-2]))
car_models['img_name'] = car_models.img_path.str.split('/').map(lambda x: x[-1])

with open(TAG_STORE_FILE) as fl:
    is_car = json.load(fl)

def generate_dataset():
    dataset = car_models.sample(frac=1).to_dict(orient='records')
    
    for data in dataset:
        if data['img_path'] in is_car:
            continue
        yield data

dataset_generator = generate_dataset()

parser = reqparse.RequestParser()
parser.add_argument('img_path')
parser.add_argument('label')


class ImageLabeler(Resource):
    def get(self):
        payload = dataset_generator.next()
        N = len(is_car)
        car_count = sum(is_car.values())
        not_car_count = N - car_count

        payload['car_count'] = car_count
        payload['not_car_count'] = not_car_count

        return payload


    def post(self):
        args = parser.parse_args()
        is_car[args['img_path']] = int(args['label'])
        data = {'img_path': args['img_path'], 'label': int(args['label'])}
        if len(is_car) % 10 == 0:
            print('Saving {} labeled data...'.format(len(is_car)))

            with open(TAG_STORE_FILE, 'w') as fl:
                json.dump(is_car, fl)

        print(data)

        return data, 201

api.add_resource(ImageLabeler, '/')

if __name__ == '__main__':

    # Start a SimpleHttpServer in the image directory
    # python -m SimpleHTTPServer 8800
    # <ip>:8800/<image name>

    app.run(host='0.0.0.0', debug=True)
