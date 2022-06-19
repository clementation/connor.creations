import array
import os

from project_object import project

# transfer data into project object
# return project object
def parse_details(sub_dir):
    images = []
    for filename in os.scandir(sub_dir):
        if filename.is_file():
            text_data = open(filename.path, 'r')
            title = text_data.readline()
            date = text_data.readline()
            description = text_data.readline()
            text_data.close()

        if filename.is_dir():
            for root, dirs, files in os.walk(filename.path):
                for filename in files:
                    images.append(os.path.join(root, filename))
    images.sort(reverse = True)

    new_project = project(title, date, description, images)
    return new_project

def get_gallery():
    new_gallery = []
    directory = 'static/projects'

    # iterate through project folders
    # pass into parse_details
    # add to gallery (array of projects)
    for filename in os.scandir(directory):
        new_gallery.append(parse_details(filename.path))
    
    return new_gallery



