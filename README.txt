Personal Portfolio Website

Project Plan: 
- A backend running Fast API
    - Parse Data in project folders into dynamic server memory
        - images + text files
    - Pass data into Jinja2 Templates


Dev Notes

FastAPI Documentation
    https://fastapi.tiangolo.com/tutorial/static-files/

Jinja Partials Extention
    https://github.com/mikeckennedy/jinja_partials

Git handbook:
    https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository

os module documentation:
    https://docs.python.org/3/library/os.html?highlight=os#module-os
Still don't understand how os.walk works


Helpfull for getting file reading runing:
    https://www.geeksforgeeks.org/how-to-iterate-over-files-in-directory-using-python/
though still don't entirely understand


Creating a virtual environment:
When creating a vertual environment here are the steps to get the filepath
to the system python.exe
    - run python
    - $ import sys
    - $ print(sys.executable)
Actually this just works:
    - $ python -m venv (name)

Launch virtual environment:
    - $ CCenv\Scripts\activate.bat

Launching Uvicorn
    - $ uvicorn main:app --reload