1. Rider posts origin and dest and time
2. All drivers see origin and dest and time
3. One driver accepts ride and choose time within range that rider set
4. Rider sees proposed ride and accepts or rejects  

# Ride
## origin or dest (mixed type)
- address (obj) - contains lat, long
## time range (pickup window; moment objects)
- start of range, end of range
## expiration (moment object)
## status (string)
- posted (rider has posted to list)
- proposed (driver has accepted ride and proposed a time)
- accepted (both rider and driver have agreed on ride)
- ongoing (both rider and driver have indicated that ride is currently happening
- completed (rider has indicated that they have reached their dest)
## Rating (int)
- 0 - 5
## Driver (obj id)
## Rider (obj id)

GET one ride - shows one ride # passing the whole ride obj associated wit
GET all rides - shows all rides that have been posted
POST one ride (rider posts their desired ride)
- req.body will contain origin, dest, start range, and user id
