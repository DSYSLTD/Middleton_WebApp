import { getDriveImageUrl } from '../utils/driveImages';

export interface ObituaryItem {
  id: string | number;
  name: string;
  years: string;
  dates: string;
  location: string;
  residence: string;
  img: string; // Deceased passport photo
  familyImg: string; // Family member passport photo
  otherPhotos: string[];
  featured: boolean;
  abstract: string;
  category: 'Woman' | 'Man' | 'Veteran' | 'Youth' | 'Teen' | 'Others';
  bio: string;
  service: {
    locationName: string;
    visitationDate: string;
    visitationTime: string;
    serviceDate: string;
    serviceTime: string;
    address: string;
    finalDisposition: string;
    site: string;
    mapCoordinates: {
      lat: number;
      lng: number;
    };
    googleMapsUrl: string;
  };
  creator: {
    name: string;
    relationship: string;
    memberSince: string;
    email: string;
    phone: string;
    img: string; // Family member passport photo
  };
  condolences: Array<{
    name: string;
    message: string;
    date: string;
    timestamp: number;
  }>;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    img: string;
  };
}

export const OBITUARIES_DATA: ObituaryItem[] = [
  {
    id: 'eleanor-vance',
    name: 'Eleanor Vance',
    years: '1942–2026',
    dates: '15/09/1942 - 05/09/2026',
    location: 'Twin Cities, MN',
    residence: 'Minneapolis, Minnesota — Twin Cities',
    img: getDriveImageUrl('1AEUFXWzfxD9ipiwH8LNUK1gK7Am8TySB'),
    familyImg: getDriveImageUrl('18Oj8jSBPYrGWNKQnwspkgZkThu1vXry_'),
    otherPhotos: [
      getDriveImageUrl('1QaiYB_bRPmNZwImxwZ0RpuEUmHKR-B6i'),
      getDriveImageUrl('1QYSM6JsMR5kercrm4AndbmrT9hZv3CeL'),
      getDriveImageUrl('1Ir27JZFtTG6TxNj8TAQDIJb1Ya46XLmC'),
      getDriveImageUrl('1kBgj_EVcEGKtKbdaB2KChk2hibLbHY87'),
      getDriveImageUrl('1eYPFg34VCR9KVV2SDYsXoSMK5jS6djpH'),
      getDriveImageUrl('1lteDGSoMjMQB4uYyduUToU__yhKd7Dro'),
    ],
    featured: true,
    abstract: 'Loving mother, grandmother, sister and cherished friend whose life was defined by compassion, wisdom and devotion to family.',
    category: 'Woman',
    bio: `Eleanor Vance was a loving mother, grandmother, sister and cherished friend whose life was defined by compassion, wisdom and devotion to family. She had a gift for making people feel welcome and valued, and her gentle nature left a lasting impression on everyone she encountered.

Eleanor treasured family gatherings, meaningful conversations, gardening and quiet moments spent with those closest to her. Her warmth, generosity and unwavering love for her family will be remembered for generations.`,
    service: {
      locationName: 'Cremation Society of Minnesota',
      visitationDate: 'Saturday, September 5, 2026',
      visitationTime: '1:00 PM – 3:00 PM',
      serviceDate: 'Saturday, September 5, 2026',
      serviceTime: '3:00 PM',
      address: 'Cremation Society of Minnesota, Minneapolis, MN',
      finalDisposition: 'Cremation',
      site: 'Cremation Society of Minnesota, Minneapolis',
      mapCoordinates: {
        lat: 44.9265,
        lng: -93.2784,
      },
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.9265,-93.2784',
    },
    creator: {
      name: 'David Vance',
      relationship: 'Son',
      memberSince: '2026',
      email: 'david.vance@middletonfamily.com',
      phone: '(612) 555-0182',
      img: getDriveImageUrl('18Oj8jSBPYrGWNKQnwspkgZkThu1vXry_'),
    },
    condolences: [
      {
        name: 'Sarah Jenkins',
        message: 'May Eleanor\'s warmth, wisdom and beautiful memories bring comfort to everyone who loved her.',
        date: 'September 1, 2026',
        timestamp: new Date('2026-09-01T00:00:00').getTime(),
      },
      {
        name: 'Thomas & Maria Ross',
        message: 'Our thoughts and prayers are with Eleanor\'s family and friends as they remember a life beautifully lived.',
        date: 'August 30, 2026',
        timestamp: new Date('2026-08-30T00:00:00').getTime(),
      },
      {
        name: 'Patricia Higgins',
        message: 'May the love Eleanor shared throughout her life continue to live on in the hearts of those she touched.',
        date: 'August 28, 2026',
        timestamp: new Date('2026-08-28T00:00:00').getTime(),
      },
    ],
    testimonial: {
      quote: 'During one of the most difficult moments of our lives, Middleton Funeral Services helped our family feel supported and cared for. They handled every detail with compassion and professionalism, allowing us to focus on remembering and celebrating our mother\'s life. We are deeply grateful for their guidance and kindness.',
      author: 'David Vance',
      role: 'Family Member',
      img: getDriveImageUrl('18Oj8jSBPYrGWNKQnwspkgZkThu1vXry_'),
    },
  },
  {
    id: 'robert-miller',
    name: 'Robert Miller',
    years: '1948–2026',
    dates: '12/04/1948 - 12/09/2026',
    location: 'St. Cloud, MN',
    residence: 'St. Cloud, Minnesota',
    img: getDriveImageUrl('1ST3kwexGWC_QaQ9avG70Av17whOqS2Ax'),
    familyImg: getDriveImageUrl('14I5hCsQ5ap1S7ZFtNvt0YUegAe8TDDmz'),
    otherPhotos: [
      getDriveImageUrl('1BiDVzlQfFJeUJci2ciHEbIzhYgUpzyRd'),
      getDriveImageUrl('1zBLcmwCuAv37pGdjqsRJFafuMTnjhTwa'),
      getDriveImageUrl('1AFD2S3RkaIAAY3k9Q7R9ZqHKsAz_eTnk'),
      getDriveImageUrl('1RmsupXYjyZQUCQsQS1oRcN2GTT0WDB0x'),
      getDriveImageUrl('1Y8lXPZNKtiPycwV3fQvPf7sHwAMWioDL'),
      getDriveImageUrl('1hi0giFxT4SCTuLB9utNybL22kG6-6jeQ'),
    ],
    featured: true,
    abstract: 'Devoted husband, father, grandfather and friend admired for his kindness, humor and dependable nature.',
    category: 'Man',
    bio: `Robert Miller was a devoted husband, father, grandfather and friend who was admired for his kindness, humor and dependable nature. He believed strongly in family and friendship and was always ready to lend a helping hand.

Robert enjoyed spending time outdoors, sharing stories with friends and gathering with family. His laughter, practical wisdom and generous spirit made him someone people could always count on.`,
    service: {
      locationName: 'Assumption/Calvary Cemetery Chapel area',
      visitationDate: 'Saturday, September 12, 2026',
      visitationTime: '9:00 AM – 11:00 AM',
      serviceDate: 'Saturday, September 12, 2026',
      serviceTime: '11:00 AM',
      address: '2341 Roosevelt Road, St. Cloud, MN 56301',
      finalDisposition: 'Traditional burial',
      site: 'Assumption/Calvary Cemeteries, St. Cloud',
      mapCoordinates: {
        lat: 45.5487,
        lng: -94.1807,
      },
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=45.5487,-94.1807',
    },
    creator: {
      name: 'Susan Miller',
      relationship: 'Wife',
      memberSince: '2026',
      email: 'susan.miller@middletonfamily.com',
      phone: '(320) 555-0144',
      img: getDriveImageUrl('14I5hCsQ5ap1S7ZFtNvt0YUegAe8TDDmz'),
    },
    condolences: [
      {
        name: 'Arthur & Helen Gable',
        message: 'Robert\'s kindness, humor and friendship will remain treasured memories for everyone who knew him.',
        date: 'September 8, 2026',
        timestamp: new Date('2026-09-08T00:00:00').getTime(),
      },
      {
        name: 'Marcus Brody',
        message: 'May Robert\'s family find strength and comfort in the many wonderful memories they shared.',
        date: 'September 5, 2026',
        timestamp: new Date('2026-09-05T00:00:00').getTime(),
      },
      {
        name: 'Clara Benson',
        message: 'May Robert rest peacefully, and may his legacy of kindness continue through those he loved.',
        date: 'September 3, 2026',
        timestamp: new Date('2026-09-03T00:00:00').getTime(),
      },
    ],
    testimonial: {
      quote: 'Losing Robert was incredibly difficult, but Middleton Funeral Services made the funeral arrangements easier for our family. They listened to our wishes, answered every question and treated Robert with dignity and respect. Their support gave me peace of mind during an overwhelming time.',
      author: 'Susan Miller',
      role: 'Family Member',
      img: getDriveImageUrl('14I5hCsQ5ap1S7ZFtNvt0YUegAe8TDDmz'),
    },
  },
  {
    id: 'john-sterling',
    name: 'John Sterling',
    years: '1955–2026',
    dates: '03/11/1955 - 19/09/2026',
    location: 'Rochester, MN',
    residence: 'Rochester, Minnesota',
    img: getDriveImageUrl('1OSxy6wiPfhe_AraPceqll7NFpT7sX7AH'),
    familyImg: getDriveImageUrl('1MUa5L-FsRY4H_jjlotLXSROSHdSCTiTR'),
    otherPhotos: [
      getDriveImageUrl('1pzlBpn_bw1hS1BGcRaqQCAyaHOAYANZL'),
      getDriveImageUrl('1SCV5yOrhFIhyl7lQ7TGhVoYCtC3HtaWl'),
      getDriveImageUrl('1lP2tD_6EYOTByTVp5VgbhlGcb1_iFaYQ'),
      getDriveImageUrl('1d34-G2Ios3SyIislwZgTG1MUde401Y4j'),
      getDriveImageUrl('11HP2_CFywjzlBB81htc2V7NHD_LAIthc'),
      getDriveImageUrl('1E7UPYVwvUk7XWYVEc3XXpUa_keVWfYjn'),
    ],
    featured: true,
    abstract: 'Devoted father, brother, friend and respected member of his community known for dependability and quiet strength.',
    category: 'Man',
    bio: `John Sterling was a devoted father, brother, friend and respected member of his community. He was known for his dependability, good humor and genuine concern for the people around him.

John valued family above all else and enjoyed spending time outdoors, catching up with friends and creating memories with those closest to him. His generosity and quiet strength will be deeply missed.`,
    service: {
      locationName: 'Oakwood Cemeteries — Healy Memorial Chapel',
      visitationDate: 'Saturday, September 19, 2026',
      visitationTime: '10:00 AM – 12:00 PM',
      serviceDate: 'Saturday, September 19, 2026',
      serviceTime: '12:00 PM',
      address: '38 7th Avenue NE, Rochester, MN 55906',
      finalDisposition: 'Cremation with permanent urn placement',
      site: 'Oakwood Downtown Cemetery Columbarium (niches for permanent public placement of cremation urns)',
      mapCoordinates: {
        lat: 44.0256,
        lng: -92.4592,
      },
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.0256,-92.4592',
    },
    creator: {
      name: 'Emily Sterling',
      relationship: 'Daughter',
      memberSince: '2026',
      email: 'emily.sterling@middletonfamily.com',
      phone: '(507) 555-0199',
      img: getDriveImageUrl('1MUa5L-FsRY4H_jjlotLXSROSHdSCTiTR'),
    },
    condolences: [
      {
        name: 'Gregory Vance',
        message: 'John will be remembered for his kindness, humor and genuine friendship.',
        date: 'September 15, 2026',
        timestamp: new Date('2026-09-15T00:00:00').getTime(),
      },
      {
        name: 'Samantha Wright',
        message: 'May the memories John created with his family and friends bring comfort during this difficult time.',
        date: 'September 12, 2026',
        timestamp: new Date('2026-09-12T00:00:00').getTime(),
      },
      {
        name: 'Dr. Richard Hayes',
        message: 'May John\'s memory remain a source of strength and peace for everyone who loved him.',
        date: 'September 10, 2026',
        timestamp: new Date('2026-09-10T00:00:00').getTime(),
      },
    ],
    testimonial: {
      quote: 'Middleton Funeral Services guided our family through every step of John\'s arrangements with patience and genuine compassion. They respected our family\'s wishes and helped us create a meaningful service that truly reflected who my father was. We will always appreciate the care they showed our family.',
      author: 'Emily Sterling',
      role: 'Family Member',
      img: getDriveImageUrl('1MUa5L-FsRY4H_jjlotLXSROSHdSCTiTR'),
    },
  },
  {
    id: 'daniel-brooks',
    name: 'Daniel Brooks',
    years: '1988–2026',
    dates: '1988 - 2026',
    location: 'Mankato, MN',
    residence: 'Mankato, Minnesota',
    img: getDriveImageUrl('15vEABapkTDjofUhoBQM0lSQKie3xyKGp'),
    familyImg: getDriveImageUrl('1PyZ6JH4GRB8V16FDMWqA7VaqxT7bTeH2'),
    otherPhotos: [
      getDriveImageUrl('1xp4zsYcb7jFXsHUTnFTrBxUlletTSlo9'),
      getDriveImageUrl('1G7KlSVUd29FEo0MPcWSRbroeoH7DNDuw'),
      getDriveImageUrl('129Ll_PDtF3IK3xoqcShgE6i0mvVbTTVJ'),
      getDriveImageUrl('1zKQC1bJQLDseR2Y5j0sm4MXBlCtil89m'),
      getDriveImageUrl('1XwCbD1pEiPQ9x4lektzSK3WlBY186HOm'),
      getDriveImageUrl('16WzHDCw4xAoFCg-fRBrVqA9nlqMD-O4G'),
    ],
    featured: true,
    abstract: 'Loving son, brother, friend and mentor whose enthusiasm and positive outlook touched many lives.',
    category: 'Man',
    bio: `Daniel Brooks was a loving son, brother, friend and mentor whose enthusiasm and positive outlook touched many lives. He was passionate about his work, enjoyed spending time with family and friends and approached life with curiosity and determination.

Daniel was known for his generosity, infectious smile and willingness to encourage others. Although his life was shorter than anyone would have wished, the memories he created will remain deeply cherished.`,
    service: {
      locationName: 'Mankato Mortuary',
      visitationDate: 'Saturday, September 26, 2026',
      visitationTime: '1:00 PM – 3:00 PM',
      serviceDate: 'Saturday, September 26, 2026',
      serviceTime: '3:00 PM',
      address: '1001 N Riverfront Drive, Mankato, MN 56001',
      finalDisposition: 'Cremation',
      site: 'Northview Crematory',
      mapCoordinates: {
        lat: 44.1717,
        lng: -93.9947,
      },
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.1717,-93.9947',
    },
    creator: {
      name: 'Linda Brooks',
      relationship: 'Mother',
      memberSince: '2026',
      email: 'linda.brooks@middletonfamily.com',
      phone: '(507) 555-0123',
      img: getDriveImageUrl('1PyZ6JH4GRB8V16FDMWqA7VaqxT7bTeH2'),
    },
    condolences: [
      {
        name: 'Michael & Sarah Jenkins',
        message: 'Daniel\'s energy, kindness and friendship made a lasting difference in many lives.',
        date: 'September 20, 2026',
        timestamp: new Date('2026-09-20T00:00:00').getTime(),
      },
      {
        name: 'David Reynolds',
        message: 'May his family find comfort in the countless memories created during Daniel\'s life.',
        date: 'September 18, 2026',
        timestamp: new Date('2026-09-18T00:00:00').getTime(),
      },
      {
        name: 'Hannah & Robert Cole',
        message: 'Although Daniel\'s life was far too short, the love he gave and the memories he created will endure.',
        date: 'September 16, 2026',
        timestamp: new Date('2026-09-16T00:00:00').getTime(),
      },
    ],
    testimonial: {
      quote: 'There are no easy words when a family loses someone so young. Middleton Funeral Services treated Daniel and our family with extraordinary care, dignity and sensitivity. Their support allowed us to concentrate on one another and celebrate Daniel\'s life rather than becoming overwhelmed by the arrangements.',
      author: 'Linda Brooks',
      role: 'Family Member',
      img: getDriveImageUrl('1PyZ6JH4GRB8V16FDMWqA7VaqxT7bTeH2'),
    },
  },
  {
    id: 'olivia-carter',
    name: 'Olivia Carter',
    years: '1993–2026',
    dates: '1993 - 2026',
    location: 'Twin Cities, MN',
    residence: 'Minneapolis–St. Paul, Minnesota — Twin Cities',
    img: getDriveImageUrl('1XXjZYT12us3Do2bJoHFhrArea40yz8yj'),
    familyImg: getDriveImageUrl('1MmyTXNsRzVG3HWQ0qIBWKTzvs7DPQFlZ'),
    otherPhotos: [
      getDriveImageUrl('1prvkMeN9YeRSRtc6m2X_U3rmkoQjMAMr'),
      getDriveImageUrl('15paXkCElh-CSRdVWhv55Vgq_BASnZ9kC'),
      getDriveImageUrl('1Vyd1vBGmq0XBk2qpF4aZGn0fwlX0StS3'),
      getDriveImageUrl('1J-S8cV5Dq7__4Lb_Eq8OunQhJmebUuUR'),
      getDriveImageUrl('1R41WUTlttJ074WVLHq9FbfO1Tx-qJsZ9'),
      getDriveImageUrl('1KZ1_XRxs0BF7iEwK_zwzN4SD1HtNDogr'),
    ],
    featured: false,
    abstract: 'Loving daughter, sister, friend and compassionate member of her community who made people feel seen, welcomed and valued.',
    category: 'Youth',
    bio: `Olivia Carter was a loving daughter, sister, friend and compassionate member of her community. She had a warm personality and a remarkable ability to make people feel seen, welcomed and valued.

Olivia enjoyed spending time with family and friends, volunteering in her community and exploring new places. Her kindness, determination and beautiful spirit left an impression on everyone fortunate enough to know her.`,
    service: {
      locationName: 'Gill Brothers Funeral and Cremation Services',
      visitationDate: 'Saturday, October 3, 2026',
      visitationTime: '10:00 AM – 12:00 PM',
      serviceDate: 'Saturday, October 3, 2026',
      serviceTime: '12:00 PM',
      address: '5801 Lyndale Avenue South, Minneapolis, MN 55419',
      finalDisposition: 'Green burial',
      site: 'Mound Cemetery of Brooklyn Center, 3515 69th Avenue North, Brooklyn Center, MN 55429',
      mapCoordinates: {
        lat: 45.0798,
        lng: -93.3300,
      },
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=45.0798,-93.3300',
    },
    creator: {
      name: 'James Carter',
      relationship: 'Father',
      memberSince: '2026',
      email: 'james.carter@middletonfamily.com',
      phone: '(612) 555-0149',
      img: getDriveImageUrl('1MmyTXNsRzVG3HWQ0qIBWKTzvs7DPQFlZ'),
    },
    condolences: [
      {
        name: 'Chloe & Brian Adams',
        message: 'Olivia\'s compassion, warmth and beautiful spirit will never be forgotten.',
        date: 'September 28, 2026',
        timestamp: new Date('2026-09-28T00:00:00').getTime(),
      },
      {
        name: 'Jessica Martinez',
        message: 'May her family and friends find comfort in the love and memories they shared with Olivia.',
        date: 'September 26, 2026',
        timestamp: new Date('2026-09-26T00:00:00').getTime(),
      },
      {
        name: 'Dr. Ethan Miller',
        message: 'Her life touched many hearts, and her memory will continue to inspire everyone who knew her.',
        date: 'September 24, 2026',
        timestamp: new Date('2026-09-24T00:00:00').getTime(),
      },
    ],
    testimonial: {
      quote: 'Our family wanted Olivia\'s farewell to reflect her love for nature and the values she held close to her heart. Middleton listened to what mattered to us and helped us create a beautiful and meaningful farewell. Their professionalism, patience and compassion meant more to our family than words can express.',
      author: 'James Carter',
      role: 'Family Member',
      img: getDriveImageUrl('1MmyTXNsRzVG3HWQ0qIBWKTzvs7DPQFlZ'),
    },
  },
  {
    id: 'martha-henderson',
    name: 'Martha Henderson',
    years: '1946–2026',
    dates: '1946 - 2026',
    location: 'Twin Cities, MN',
    residence: 'St. Paul, Minnesota — Twin Cities',
    img: getDriveImageUrl('19ilGpETIGueRcewu8_stEGWXFBvGOZSy'),
    familyImg: getDriveImageUrl('1XuRNuWfalhLxFg0E6EkRD-sI8hfonpiR'),
    otherPhotos: [
      getDriveImageUrl('1Yx6JZwROVo9fu1bOImQhCLCl9ZO1wzA9'),
      getDriveImageUrl('1oIpmOEI5ldD_NRpszHWFl9XzPNQBN6_z'),
      getDriveImageUrl('1jzXazSPBPI6YGdV4epQF86frXZz8-ksZ'),
      getDriveImageUrl('18MMKmw7P0Eg0h-hD9SEg_Pd5kwLd4FNg'),
      getDriveImageUrl('1ukIsTwN5MfFBniNSiLOInujnRevAPDFU'),
      getDriveImageUrl('11ydZEKxKuOVLHWobUTaWu_f29DOQoBgy'),
    ],
    featured: false,
    abstract: 'Loving mother, grandmother, sister and friend whose life was centered around family, faith, service and community.',
    category: 'Woman',
    bio: `Martha Henderson was a loving mother, grandmother, sister and friend whose life was centered around family, faith, service and community. She was known for her gentle personality, thoughtful advice and ability to make everyone around her feel at home.

Martha enjoyed cooking for family gatherings, gardening and spending quiet afternoons with her grandchildren. Her generosity and warmth created countless memories that her family will treasure for years to come.`,
    service: {
      locationName: 'Willwerscheid Funeral Home & Cremation Service',
      visitationDate: 'Saturday, October 10, 2026',
      visitationTime: '10:00 AM – 12:00 PM',
      serviceDate: 'Saturday, October 10, 2026',
      serviceTime: '12:00 PM',
      address: '1167 Grand Avenue, St. Paul, MN 55105',
      finalDisposition: 'Traditional burial',
      site: 'Oakland Cemetery, St. Paul, Minnesota',
      mapCoordinates: {
        lat: 44.9726,
        lng: -93.0898,
      },
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.9726,-93.0898',
    },
    creator: {
      name: 'Thomas Henderson',
      relationship: 'Son',
      memberSince: '2026',
      email: 'thomas.henderson@middletonfamily.com',
      phone: '(651) 555-0172',
      img: getDriveImageUrl('1XuRNuWfalhLxFg0E6EkRD-sI8hfonpiR'),
    },
    condolences: [
      {
        name: 'Eleanor & Frank Wright',
        message: 'Martha\'s warmth, wisdom and love for her family will remain a cherished part of her legacy.',
        date: 'October 5, 2026',
        timestamp: new Date('2026-10-05T00:00:00').getTime(),
      },
      {
        name: 'Grace Thompson',
        message: 'May the beautiful memories Martha created with her family bring comfort and peace.',
        date: 'October 3, 2026',
        timestamp: new Date('2026-10-03T00:00:00').getTime(),
      },
      {
        name: 'Pastor Samuel Green',
        message: 'Her kindness touched many lives, and her memory will live on in the hearts of everyone who knew her.',
        date: 'October 1, 2026',
        timestamp: new Date('2026-10-01T00:00:00').getTime(),
      },
    ],
    testimonial: {
      quote: 'Middleton Funeral Services made a difficult experience much more manageable for our family. From the first conversation through the funeral arrangements, we felt listened to, respected and supported. They took care of the details with professionalism while never losing sight of the person behind the arrangements—our mother.',
      author: 'Thomas Henderson',
      role: 'Family Member',
      img: getDriveImageUrl('1XuRNuWfalhLxFg0E6EkRD-sI8hfonpiR'),
    },
  },
  {
    id: 'william-anderson',
    name: 'William Anderson',
    years: '1951–2026',
    dates: '1951 - 2026',
    location: 'Rochester, MN',
    residence: 'Rochester, Minnesota',
    img: getDriveImageUrl('1BZ158fukwAmIRLg27H8p88Mdw2zRxCEv'),
    familyImg: getDriveImageUrl('1DhHADPLun619jaSnRMd2NyjhiNtUuqzE'),
    otherPhotos: [
      getDriveImageUrl('1qUJS2eF756jzuQuu4_S6A7CVlF7DOZEC'),
      getDriveImageUrl('11heTzjbo3-oqnU6w71yEkceiWOP-7dAj'),
      getDriveImageUrl('1Mln3w8C0Et3U20t9MkhQPzT2zrZuVGPw'),
      getDriveImageUrl('1qAGI3WRg1FMYDW2XTEZoxciqvqUXgkEd'),
      getDriveImageUrl('1gyKFrIoi8XBjYnU_cwYu528hzfe72yxp'),
      getDriveImageUrl('1GsV0UZW1oi3xrHv4IL8gotbGyq4Qb5Qy'),
    ],
    featured: false,
    abstract: 'Devoted husband, father, grandfather and friend who lived a life characterized by hard work, integrity and generosity.',
    category: 'Man',
    bio: `William Anderson was a devoted husband, father, grandfather and friend who lived a life characterized by hard work, integrity and generosity. He was someone his family could depend on and a friend who was always willing to offer practical advice or a helping hand.

William enjoyed fishing, woodworking, watching sports and spending time outdoors. His stories, humor and quiet strength will be remembered by everyone who knew him.`,
    service: {
      locationName: 'Ranfranz and Vine Funeral Homes',
      visitationDate: 'Saturday, October 17, 2026',
      visitationTime: '9:00 AM – 11:00 AM',
      serviceDate: 'Saturday, October 17, 2026',
      serviceTime: '11:00 AM',
      address: '5421 Royal Place NW, Rochester, MN 55901',
      finalDisposition: 'Cremation',
      site: 'Ranfranz and Vine Funeral Homes (Memorial reception following cremation)',
      mapCoordinates: {
        lat: 44.0618,
        lng: -92.5282,
      },
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.0618,-92.5282',
    },
    creator: {
      name: 'Jennifer Anderson',
      relationship: 'Daughter',
      memberSince: '2026',
      email: 'jennifer.anderson@middletonfamily.com',
      phone: '(507) 555-0188',
      img: getDriveImageUrl('1DhHADPLun619jaSnRMd2NyjhiNtUuqzE'),
    },
    condolences: [
      {
        name: 'Arthur & Brenda Cole',
        message: 'William\'s integrity, humor and generosity will be remembered with deep affection.',
        date: 'October 12, 2026',
        timestamp: new Date('2026-10-12T00:00:00').getTime(),
      },
      {
        name: 'Leonard Vance',
        message: 'May his family find peace in the memories of a life filled with love, friendship and service.',
        date: 'October 10, 2026',
        timestamp: new Date('2026-10-10T00:00:00').getTime(),
      },
      {
        name: 'Dr. Raymond Scott',
        message: 'William leaves behind a legacy of kindness and strength that will continue through those who knew him.',
        date: 'October 8, 2026',
        timestamp: new Date('2026-10-08T00:00:00').getTime(),
      },
    ],
    testimonial: {
      quote: 'Our family was grateful to have compassionate professionals beside us during such a difficult time. Middleton Funeral Services made sure that every aspect of Dad\'s arrangements was handled respectfully and thoughtfully. Their kindness made an incredibly difficult process feel a little easier.',
      author: 'Jennifer Anderson',
      role: 'Family Member',
      img: getDriveImageUrl('1DhHADPLun619jaSnRMd2NyjhiNtUuqzE'),
    },
  },
  {
    id: 'grace-kwamboka',
    name: 'Dr. Grace Kwamboka',
    years: '1960–2026',
    dates: '1960 - 2026',
    location: 'St. Cloud, MN',
    residence: 'St. Cloud, Minnesota',
    img: getDriveImageUrl('1ttNVel5zC46kNT0V6v0obBI-Gi37Zr05'),
    familyImg: getDriveImageUrl('1RbwOIdaWyAR4m-x666VcoxVTfNBNWUM3'),
    otherPhotos: [
      getDriveImageUrl('1l6GngVA7_iLp5OM872AQiX-xPP01iyEK'),
      getDriveImageUrl('1xtpxzsCkf6emWoKpXJMid8AakhQxD5bI'),
      getDriveImageUrl('1dzVg9RXxAv2ymTySxkCL8DWCc96dfVnA'),
      getDriveImageUrl('1n2FTA1df9XwiKBnIOEC6JjK50mAyQWs3'),
      getDriveImageUrl('1TLLvigmXUmt1plLpVwCdmpgDmtrEHLl-'),
      getDriveImageUrl('1Au8NcpwET3AG6O_ZDRUJE3oFFEwXxC47'),
    ],
    featured: false,
    abstract: 'Loving mother, sister, aunt and cherished friend admired for her compassion, resilience and ability to bring people together.',
    category: 'Woman',
    bio: `Dr. Grace Kwamboka was a loving mother, sister, aunt and cherished friend. She was admired for her compassion, resilience and ability to bring people together. Grace believed strongly in helping others and often gave her time and encouragement to people who needed support.

She enjoyed reading, traveling, music and spending time with family. Her thoughtful nature and infectious laugh will remain among the memories most treasured by those who knew her.`,
    service: {
      locationName: 'Benson Funeral Home',
      visitationDate: 'Saturday, October 24, 2026',
      visitationTime: '1:00 PM – 3:00 PM',
      serviceDate: 'Saturday, October 24, 2026',
      serviceTime: '3:00 PM',
      address: '1111 25th Avenue South, St. Cloud, MN 56301',
      finalDisposition: 'Cremation',
      site: 'Family memorial garden',
      mapCoordinates: {
        lat: 45.5345,
        lng: -94.1478,
      },
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=45.5345,-94.1478',
    },
    creator: {
      name: 'Mark Kwamboka',
      relationship: 'Son',
      memberSince: '2026',
      email: 'mark.kwamboka@middletonfamily.com',
      phone: '(320) 555-0163',
      img: getDriveImageUrl('1RbwOIdaWyAR4m-x666VcoxVTfNBNWUM3'),
    },
    condolences: [
      {
        name: 'Dr. Beatrice Nyambura',
        message: 'Grace\'s compassion and generosity made the world brighter for everyone fortunate enough to know her.',
        date: 'October 19, 2026',
        timestamp: new Date('2026-10-19T00:00:00').getTime(),
      },
      {
        name: 'David & Catherine Ochieng',
        message: 'May the love and memories shared with Grace bring comfort to her family and friends.',
        date: 'October 17, 2026',
        timestamp: new Date('2026-10-17T00:00:00').getTime(),
      },
      {
        name: 'Sister Mary Teresa',
        message: 'Her beautiful spirit will continue to live through the many people whose lives she touched.',
        date: 'October 15, 2026',
        timestamp: new Date('2026-10-15T00:00:00').getTime(),
      },
    ],
    testimonial: {
      quote: 'Middleton Funeral Services understood that every family grieves differently. They gave us the space to make decisions while providing clear guidance whenever we needed it. Their compassionate approach helped us focus on celebrating Grace\'s life and the wonderful memories she left behind.',
      author: 'Mark Kwamboka',
      role: 'Family Member',
      img: getDriveImageUrl('1RbwOIdaWyAR4m-x666VcoxVTfNBNWUM3'),
    },
  },
  {
    id: 'michael-reed',
    name: 'Michael Reed',
    years: '1990–2026',
    dates: '1990 - 2026',
    location: 'Twin Cities, MN',
    residence: 'Minneapolis, Minnesota — Twin Cities',
    img: getDriveImageUrl('1_IjE5grWtz7yVslV4GVI8-cRVJkkujKV'),
    familyImg: getDriveImageUrl('1LeC5sboQ92anTQRWMKaEChzfAVpCVtWM'),
    otherPhotos: [
      getDriveImageUrl('1ffUSbVlVDhVfxdXpw2gGZ5yNvYANXJeA'),
      getDriveImageUrl('1FDt_1A_z7BBAJZN1y4YNujJyKinfQLhW'),
      getDriveImageUrl('1FfLjed-iSkoCoQt2crFzbsPNSQVVxwFL'),
      getDriveImageUrl('1nFAYsClj09906LS7DulQJi_OyA93qdCD'),
      getDriveImageUrl('1EDA-oSdljUAKHHLnkHYjIP2qCoX0UIJJ'),
      getDriveImageUrl('19pVSjezO_LKcDmpHKwe4gXidD2NZkndS'),
    ],
    featured: false,
    abstract: 'Loving son, brother, uncle and friend whose enthusiasm for life brought energy and laughter wherever he went.',
    category: 'Youth',
    bio: `Michael Reed was a loving son, brother, uncle and friend whose enthusiasm for life brought energy and laughter wherever he went. He was ambitious, curious and deeply committed to the people he cared about.

Michael enjoyed technology, sports, traveling and spending time with friends. He had a generous heart and a natural ability to make people feel comfortable. His sudden passing leaves behind a profound sense of loss among his family and friends.`,
    service: {
      locationName: 'Washburn-McReavy Funeral Chapels',
      visitationDate: 'Saturday, October 31, 2026',
      visitationTime: '10:00 AM – 12:00 PM',
      serviceDate: 'Saturday, October 31, 2026',
      serviceTime: '12:00 PM',
      address: '2301 Dupont Avenue South, Minneapolis, MN 55405',
      finalDisposition: 'Traditional burial',
      site: 'Lakewood Cemetery, Minneapolis',
      mapCoordinates: {
        lat: 44.9394,
        lng: -93.3027,
      },
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.9394,-93.3027',
    },
    creator: {
      name: 'Rachel Reed',
      relationship: 'Sister',
      memberSince: '2026',
      email: 'rachel.reed@middletonfamily.com',
      phone: '(612) 555-0131',
      img: getDriveImageUrl('1LeC5sboQ92anTQRWMKaEChzfAVpCVtWM'),
    },
    condolences: [
      {
        name: 'Tyler & Jordan Brooks',
        message: 'Michael\'s energy, laughter and friendship will remain in the hearts of everyone who knew him.',
        date: 'October 26, 2026',
        timestamp: new Date('2026-10-26T00:00:00').getTime(),
      },
      {
        name: 'Samantha Hughes',
        message: 'May his family find comfort in the many beautiful memories created during Michael\'s life.',
        date: 'October 24, 2026',
        timestamp: new Date('2026-10-24T00:00:00').getTime(),
      },
      {
        name: 'Alex Rivera',
        message: 'Though his life was far too short, the joy Michael brought to others will never be forgotten.',
        date: 'October 22, 2026',
        timestamp: new Date('2026-10-22T00:00:00').getTime(),
      },
    ],
    testimonial: {
      quote: 'Michael\'s passing was an incredibly painful experience for our family, but Middleton Funeral Services helped us navigate the practical details with compassion and understanding. They treated Michael with dignity and made sure our family\'s wishes were respected throughout the process. We are grateful for the care they provided.',
      author: 'Rachel Reed',
      role: 'Family Member',
      img: getDriveImageUrl('1LeC5sboQ92anTQRWMKaEChzfAVpCVtWM'),
    },
  },
  {
    id: 'sophia-martin',
    name: 'Sophia Martin',
    years: '1994–2026',
    dates: '1994 - 2026',
    location: 'Mankato, MN',
    residence: 'Mankato, Minnesota',
    img: getDriveImageUrl('1RyFzsPHDIKAix07KPgGXc2BN1TuHZEFd'),
    familyImg: getDriveImageUrl('1ZXDUReR40a_ACsar9kGQK_89VdWR5J4T'),
    otherPhotos: [
      getDriveImageUrl('1KugazEWcXZ7edZO571kxZe0HQG3XfZYV'),
      getDriveImageUrl('13nP4TJJYnqXZ_KTIgmyKMOnPOKCaKZUL'),
      getDriveImageUrl('14jT_54Fg2MYcIA18tzpdrbW0o4xGF8wQ'),
      getDriveImageUrl('13_Xp1TRcsFNd7wKcMNqyFFyp9THj5DVV'),
      getDriveImageUrl('1T382dhaf1iTx7JEX_hTxyMFxZAZMOi45'),
      getDriveImageUrl('1NJxrqMN3opZPc1rRddYxImPudVHKVi-T'),
    ],
    featured: false,
    abstract: 'Beloved daughter, sister, friend and mentor whose kindness and determination inspired those around her.',
    category: 'Youth',
    bio: `Sophia Martin was a beloved daughter, sister, friend and mentor whose kindness and determination inspired those around her. She had a compassionate heart and was known for encouraging others to pursue their dreams.

Sophia loved music, photography, nature and spending time with her family and close friends. Her creativity, warmth and beautiful smile brought joy to many people. She leaves behind memories that will continue to be cherished.`,
    service: {
      locationName: 'Mankato Mortuary',
      visitationDate: 'Saturday, November 7, 2026',
      visitationTime: '10:00 AM – 12:00 PM',
      serviceDate: 'Saturday, November 7, 2026',
      serviceTime: '12:00 PM',
      address: '1001 North Riverfront Drive, Mankato, MN 56001',
      finalDisposition: 'Eco-friendly / green burial',
      site: 'Woodland burial section',
      mapCoordinates: {
        lat: 44.1717,
        lng: -93.9947,
      },
      googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=44.1717,-93.9947',
    },
    creator: {
      name: 'Jason Martin',
      relationship: 'Father',
      memberSince: '2026',
      email: 'jason.martin@middletonfamily.com',
      phone: '(507) 555-0177',
      img: getDriveImageUrl('1ZXDUReR40a_ACsar9kGQK_89VdWR5J4T'),
    },
    condolences: [
      {
        name: 'Olivia & Marcus Vance',
        message: 'Sophia\'s kindness, creativity and beautiful spirit will remain an inspiration to everyone who knew her.',
        date: 'November 2, 2026',
        timestamp: new Date('2026-11-02T00:00:00').getTime(),
      },
      {
        name: 'Hannah Hayes',
        message: 'May the memories of Sophia\'s laughter, love and friendship bring comfort to those who mourn her.',
        date: 'November 1, 2026',
        timestamp: new Date('2026-11-01T00:00:00').getTime(),
      },
      {
        name: 'Emily Davis',
        message: 'Her life may have been too short, but the love she shared will continue to live on.',
        date: 'October 30, 2026',
        timestamp: new Date('2026-10-30T00:00:00').getTime(),
      },
    ],
    testimonial: {
      quote: 'Sophia deserved a farewell that reflected the beauty, kindness and love she brought into our lives. Middleton Funeral Services listened carefully to our family and helped us create a meaningful and respectful service. Their compassion and attention to detail gave our family comfort during a very difficult time.',
      author: 'Jason Martin',
      role: 'Family Member',
      img: getDriveImageUrl('1ZXDUReR40a_ACsar9kGQK_89VdWR5J4T'),
    },
  },
];

export function getCustomObituaries(): ObituaryItem[] {
  try {
    const saved = localStorage.getItem('middleton_custom_obituaries');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load custom obituaries', e);
  }
  return [];
}

export function saveCustomObituary(item: ObituaryItem) {
  try {
    const existing = getCustomObituaries();
    const updated = [item, ...existing];
    localStorage.setItem('middleton_custom_obituaries', JSON.stringify(updated));
    // Prepend to runtime array if not already present
    if (!OBITUARIES_DATA.some(o => String(o.id) === String(item.id))) {
      OBITUARIES_DATA.unshift(item);
    }
  } catch (e) {
    console.error('Failed to save custom obituary', e);
  }
}

// Hydrate on module load
if (typeof window !== 'undefined') {
  const customItems = getCustomObituaries();
  customItems.forEach(item => {
    if (!OBITUARIES_DATA.some(o => String(o.id) === String(item.id))) {
      OBITUARIES_DATA.unshift(item);
    }
  });
}
