when a booking is made by deposit with a uploaded image, the s3 bucket link is added to the notes of the booking reservation. 

Hitting search from main page should redirect to a second page, with a map and all of the listings available. like airbnb 

update terms and condition to protect yourself from manage reservation page. 

Rethink entire communication (since part of it comes from the website, part from smoobu)

create a document with all the manual test we should do to confirm this update works as intended. implement UI testing (I believe david or santi know how to) 

discount codes?

on first load: load last searched date and number of people (even from previous session). if no dates select the closest weekend (friday to saturday)

when you put how many people are coming you can either just add people normally (+ - on the booking engine) or open a small panel where you can specify (adultos, niños, bebé, que no cuentan, mascotas)

non refundable reservations should be a quality given from the backend to the portal. booking engine should show the price with the discound organically on the booking engine. when backend does booking on smoobu it adds the discount code (source of truth remains the smoobu api). Reservation made with the discount code cannot be modified and cancelled with a refund. reservation without the discount code can change easily dates (from the portal they can change the dates, with availability and prices of that same listing, or change to others, updating price and everything else, deposit does not need to change)

when the person creates a password with the reservation id, cache it so we can reload it in automatically so he can quickly manage his reservation. if a new reservation is made, save both, but load the most recent one. 

show microsoft weather on portal. show current weather and, if available, current 

also show smoobu messages and the option to send an email

update number of people on portal 

when a person makes a reservation make them create the password and redirect them immediately to the portal. 

check if paypal has a way of paying that is more straightforward (enter cc details and go)

make the token last until 7 days after their check out. so they can access the reservation page easily everytime they connect (maybe even suggest saving it as favorite)

remove popup message about discount code, since we will show it natively. 

Actively show discounts as they are being applied to the base price, by salshing it and showing the new price with more visual emphasis. (this applies to discount codes, weekly, monthly stays, smoobu still is always the source of truth of this information)

implement testing using real values (even maybe create a booking? do the happy paths)
