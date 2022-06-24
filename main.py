from project_object import project
from driver import *


from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from fastapi.templating import Jinja2Templates
import jinja_partials

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="static/html-templates")
jinja_partials.register_starlette_extensions(templates)

@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    gallery = get_gallery()
    return templates.TemplateResponse("portfolio.html", {"request":request, "gallery": gallery})

@app.get("/portfolio", response_class=HTMLResponse)
def home(request: Request):
    gallery = get_gallery()
    return templates.TemplateResponse("portfolio.html", {"request":request, "gallery": gallery})


# test_gallery = get_gallery()

# for project in test_gallery:
#     project.print_project()