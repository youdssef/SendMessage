/* SMS can only be a maximum of 160 characters.
   If the user wants to send a message bigger than that, we need to break it up.
   We want a multi-part message to have this added to each message:
   " - Part 1 of 2"
*/

// You need to fix this method, currently it will crash with > 160 char messages.
const sendSmsMessage = function sendSmsMessage (text, to, from) {
	if (text.length > 160 ){
		// array to store the messages
		var array = [];
		// position of currentMessage; relevant for  variable addedText
		var currentMessage = 1; 
		// placeholder for the maximum count of messages 
		// 4 characters reserved for max 9999 messages
		// it will crash if the max. count of messages > 9999 but this case is higly unilkely
		var placeholder = "####";
		// variable addedText will be added to the end of a message 
		var addedText = " - Part "+currentMessage+" of "+placeholder;
		
		//method for splitting
		for(i=0, charslength = text.length; i < charslength; i+=(160-addedText.length)){
			//set addedText to position of currentMessage
			addedText = " - Part "+currentMessage+" of "+placeholder;
			//split text at 160 characters - addedText.length and add addedText 
			array.push(text.substring(i, (i+160-addedText.length)).concat(addedText));
			//increment currentMessage
			currentMessage++;
		}
		
		
		//method for sending splitted messages
		for (i=0 ; i < array.length ; i++) {
			//replace placeholder with max. count of messages
			array[i] = array[i].replace(placeholder, array.length);
			console.log(array[i]);
			//send message via original method 
			deliverMessageViaCarrier(array[i], to, from); 
		}
	}
	else{
		deliverMessageViaCarrier(text, to, from);
	}
}

// This method actually sends the message via a SMS carrier
// This method works, you don't change it,
const deliverMessageViaCarrier = function deliverMessageViaCarrier (text, to, from) {
  SmsCarrier.deliverMessage(text, to, from)
}
//only for test purpose
var text = "blabalbalbalbalbalbalbassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss	sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss";
var to = "123456789";
var from = "987654321";
sendSmsMessage(text , to, from);
	