export interface CountyStructure {
  subCounties: string[];
  wards: Record<string, string[]>;
}

const RAW_COUNTY_DATA: Record<string, CountyStructure> = {
  'Hennepin': {
    subCounties: ['Minneapolis', 'Bloomington', 'Edina', 'Plymouth', 'Minnetonka', 'Maple Grove', 'Eden Prairie', 'Richfield', 'St. Louis Park', 'Brooklyn Park'],
    wards: {
      'Minneapolis': ['Downtown / North Loop', 'Northeast', 'South Uptown', 'Uptown / Calhoun Isles', 'Longfellow', 'University District', 'Camden', 'Near North'],
      'Bloomington': ['East Bloomington', 'West Bloomington', 'Penn-American District', 'Normandale'],
      'Edina': ['Morningside', 'Country Club', 'Parkwood Knolls', 'Braemar Hills'],
      'Plymouth': ['Bass Lake District', 'Medicine Lake Road', 'East Medicine Lake'],
      'Minnetonka': ['Glen Lake', 'Groveland', 'Oak Ridge', 'Ridgedale'],
      'Maple Grove': ['Arbor Lakes', 'Rush Creek', 'Weaver Lake'],
      'Eden Prairie': ['Olympic Hills', 'Prairie Center', 'Flying Cloud'],
      'Richfield': ['Penn Central', 'Lyndale Avenue Corridor', 'Wood Lake District'],
      'St. Louis Park': ['Wolfe Park', 'Texa-Tonka', 'Fern Hill'],
      'Brooklyn Park': ['Edinburgh USA', 'River Park', 'Brookdale']
    }
  },
  'Ramsey': {
    subCounties: ['St. Paul', 'Roseville', 'Maplewood', 'White Bear Lake', 'Shoreview', 'New Brighton'],
    wards: {
      'St. Paul': ['Downtown / Lowertown', 'Summit-University', 'Highland Park', 'Macalester-Groveland', 'Como Park', 'Payne-Phalen', 'St. Anthony Park'],
      'Roseville': ['HarMar District', 'Lexington Center', 'Central Park District'],
      'Maplewood': ['Gladstone', 'Battle Creek Area', 'Hazelwood'],
      'White Bear Lake': ['Downtown White Bear', 'Bellaire', 'South Shore'],
      'Shoreview': ['Island Lake', 'Snail Lake', 'Turtle Lake'],
      'New Brighton': ['Long Lake', 'Silver Lake', 'City Center']
    }
  },
  'Blue Earth': {
    subCounties: ['Mankato', 'North Mankato', 'Lake Crystal', 'Eagle Lake', 'Mapleton', 'Madison Lake'],
    wards: {
      'Mankato': ['Downtown Center', 'Hilltop', 'Campus Area / MSU', 'Tour Tellotte Park', 'West Mankato'],
      'North Mankato': ['Lower North', 'Upper North', 'Belgrade Hill'],
      'Lake Crystal': ['Lakeside', 'Main Street District'],
      'Eagle Lake': ['Eagle Lake Central', 'South Village'],
      'Mapleton': ['Township North', 'Heritage District'],
      'Madison Lake': ['Lakeview North', 'Point District']
    }
  },
  'Olmsted': {
    subCounties: ['Rochester', 'Byron', 'Stewartville', 'Eyota', 'Pine Island'],
    wards: {
      'Rochester': ['Downtown Mayo Medical District', 'Kutzky Park', 'Slatterly Park', 'Historic Southwest', 'Country Club Manor', 'Northern Hills'],
      'Byron': ['Somerby District', 'Central Byron'],
      'Stewartville': ['Bear Cave District', 'Florence Park'],
      'Eyota': ['Downtown Eyota', 'Westwood'],
      'Pine Island': ['Trailhead District', 'River Park']
    }
  },
  'Dakota': {
    subCounties: ['Eagan', 'Burnsville', 'Lakeville', 'Apple Valley', 'Inver Grove Heights', 'Hastings'],
    wards: {
      'Eagan': ['Promenade', 'Town Centre', 'Diffley District', 'Lexington Ridge'],
      'Burnsville': ['Heart of the City', 'Buck Hill Area', 'Lac Lavon'],
      'Lakeville': ['Heritage Center', 'Orchard Lake', 'Crystal Lake'],
      'Apple Valley': ['Valleywood', 'Galaxie Corridor', 'Zoo District'],
      'Inver Grove Heights': ['Arbor Pointe', 'Cahill Avenue', 'Simley District'],
      'Hastings': ['Historic Downtown', 'Riverfront', 'Vermillion Falls']
    }
  },
  'Scott': {
    subCounties: ['Shakopee', 'Prior Lake', 'Savage', 'Jordan', 'Belle Plaine'],
    wards: {
      'Shakopee': ['Downtown Historic', 'Valleyfair District', 'Dean Lakes', 'Canterbury Park Area'],
      'Prior Lake': ['Lakefront District', 'Mystic Lake Area', 'Grainwood'],
      'Savage': ['McColl Pond', 'Hamilton District', 'River Crossing'],
      'Jordan': ['Historic Downtown', 'Mill Pond'],
      'Belle Plaine': ['Prairie Lake', 'Main Street']
    }
  },
  'Washington': {
    subCounties: ['Woodbury', 'Stillwater', 'Cottage Grove', 'Forest Lake', 'Oakdale'],
    wards: {
      'Woodbury': ['City Center', 'Bielenberg', 'Radio Drive Corridor', 'Powers Lake'],
      'Stillwater': ['Historic St. Croix Riverfront', 'North Hill', 'South Hill'],
      'Cottage Grove': ['Kingston', 'Woodridge', 'Glacial Valley'],
      'Forest Lake': ['Clear Lake', 'Lakeside Center', 'Broadway'],
      'Oakdale': ['Discovery Park', 'Tartan', 'Gateway']
    }
  }
};

const DEFAULT_SUB_COUNTIES = ['Central District', 'North District', 'South District', 'East District', 'West District'];
const DEFAULT_WARDS = ['Downtown Center', 'Ward 1', 'Ward 2', 'Ward 3', 'Metro Area'];

export const COUNTY_DATA: Record<string, CountyStructure> = new Proxy(RAW_COUNTY_DATA, {
  get(target, countyName: string) {
    if (target[countyName]) {
      const county = target[countyName];
      return {
        subCounties: county.subCounties || DEFAULT_SUB_COUNTIES,
        wards: new Proxy(county.wards || {}, {
          get(wTarget, scName: string) {
            if (wTarget[scName] && wTarget[scName].length > 0) {
              return wTarget[scName];
            }
            return DEFAULT_WARDS;
          }
        })
      };
    }
    return {
      subCounties: DEFAULT_SUB_COUNTIES,
      wards: new Proxy({}, {
        get() {
          return DEFAULT_WARDS;
        }
      })
    };
  }
});
