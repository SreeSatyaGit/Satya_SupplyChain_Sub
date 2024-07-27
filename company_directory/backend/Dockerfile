# Use an official Python runtime as a parent image
FROM python:3.9

# Set the working directory in the container
WORKDIR /code

# Copy the requirements file into the container
COPY backend/requirements.txt /code/

# Install any needed packages specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend code
COPY backend /code/

# Copy the data files into the container
COPY dataFiles /code/dataFiles

# Make port 8000 available to the world outside this container
EXPOSE 8000

# Define environment variable
ENV PYTHONUNBUFFERED=1

# Run the application
CMD ["python", "backend/manage.py", "runserver", "0.0.0.0:8000"]
