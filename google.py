import logging
import datetime
import requests
import json
from config import settings

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
logger.info('Starting oak_google.py')

tstamp = datetime.datetime.now()

def getAchievement(achName):
  for achievement in playerdata['achievements']:
    if achievement['name'] == achName:
      return achievement['value']
  return 0

# pull data from COC
logger.info('API Pull initiated...')
url = 'https://api.clashofclans.com/v1/clans/%25CVCJR89/members'
headers = {'Accept':'application/json','Authorization':'Bearer ' + settings['supercell']['apiKey']}
r = requests.get(url, headers=headers)
data = r.json()
logger.info('API Pull complete')

# write full json to sheet
logger.info('Write member info to Sheet')
gurl = 'https://script.google.com/macros/s/AKfycbzhXbO1CCcRuPzTU0mos7MowcucvclAKokkTiq91463xW1ftQEO/exec'
payload = {'type':'members','data':data}
r = requests.post(gurl,data=json.dumps(payload))
logger.info('Google response: %s', r.status_code)

# find TH and Heroes for individual players
payloaddata = []
for member in data['items']:
  url = 'https://api.clashofclans.com/v1/players/%23' + member['tag'][1:].strip()
  r = requests.get(url, headers=headers)
  playerdata = r.json()
  try:
    bh = playerdata['builderHallLevel']
  except Exception:
    bh = 0
  try:
    league = playerdata['league']['name']
    icon = playerdata['league']['iconUrls']['small']
  except:
    league = 'Unranked'
    icon = 'https://api-assets.clashofclans.com/leagues/72/e--YMyIexEQQhE4imLoJcwhYn6Uy8KqlgyY3_kFV6t4.png'
  bk = 0
  aq = 0
  gw = 0
  bm = 0
  for hero in playerdata['heroes']:
    if hero['name'] == 'Barbarian King':
      bk = hero['level']
    if hero['name'] == 'Archer Queen':
      aq = hero['level']
    if hero['name'] == 'Grand Warden':
      gw = hero['level']
    if hero['name'] == 'Battle Machine':
      bm = hero['level']
  payloaddata.append({'tag':playerdata['tag'],'townHall':playerdata['townHallLevel'],'warStars':playerdata['warStars'],'attackWins':pla$

# Send player data to sheet
logger.info('Begin Google Sheets player data push')
payload = {'type':'players','data':payloaddata}
r = requests.post(gurl,data=json.dumps(payload))
logger.info('Google response: %s', r.status_code)

logger.info('Script to Google complete at ' + datetime.datetime.now().ctime())
