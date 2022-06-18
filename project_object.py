# project objet will store information parsed from project folder

class project:
    def __init__(self, title, date, description, images): 
        self.title = title
        self.date = date
        self.description = description
        self.images = images


    # helper to check if object contains data
    def print_project(self):
        print("\n==========")
        print(self.title)
        print(self.date)
        print(self.description)
        print()
        for i in self.images:
            print(i)
        print("==========\n")


    # getters
    def get_title(self):
        return self.title

    def get_date(self):
        return self.date

    def get_description(self):
        return self.description

    def get_images(self):
        return self.images


    # setters
    # Not needed for now since class should not chage after being initialized


