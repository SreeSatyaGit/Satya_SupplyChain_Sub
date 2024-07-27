from django.http import JsonResponse, HttpResponseNotFound
import pandas as pd
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Paths to CSV files
COMPANIES_CSV = './dataFiles/companies.csv'
LOCATIONS_CSV = './dataFiles/locations.csv'

def get_all_companies(request):
    try:
        df = pd.read_csv(COMPANIES_CSV)
        companies = df.to_dict(orient='records')
        return JsonResponse(companies, safe=False)
    except Exception as e:
        logger.error(f"Error reading companies: {e}")
        return JsonResponse({'error': 'Unable to read companies data'}, status=500)

def get_company_by_id(request, company_id):
    try:
        df = pd.read_csv(COMPANIES_CSV)
        company = df[df['company_id'] == company_id].to_dict(orient='records')
        if not company:
            return HttpResponseNotFound({'error': 'Company not found'})
        return JsonResponse(company[0], safe=False)
    except Exception as e:
        logger.error(f"Error reading company by ID: {e}")
        return JsonResponse({'error': 'Unable to read company data'}, status=500)

def get_locations_by_company_id(request, company_id):
    try:
        df = pd.read_csv(LOCATIONS_CSV)
        locations = df[df['company_id'] == company_id].to_dict(orient='records')
        return JsonResponse(locations, safe=False)
    except Exception as e:
        logger.error(f"Error reading locations: {e}")
        return JsonResponse({'error': 'Unable to read locations data'}, status=500)
