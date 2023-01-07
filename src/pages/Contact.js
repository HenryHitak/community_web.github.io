import emailjs from 'emailjs-com';

export default function Contact(){
    const contactSubmit = (event)=>{
        event.preventDefault();
        emailjs.sendForm('service_5nfpaxi','template_owmjxkf',event.target,'igGDlOlt-OPxjCdwj')
        .then((result)=>{
            alert("Your message has been sent successfully.");
        },(error)=>{
            alert("Error");
        });
        
    }
    return(
        <>
            <h1>Contact Page</h1>
            <form onSubmit={(event)=>contactSubmit(event)}>
                <input type="email" name="contactmail" placeholder="Write your email"/>
                <input type="text" name="contactname" placeholder="Write your name"/>
                <textarea name="message" placeholder="Write your message"></textarea>
                <button type="submit">Send</button>
            </form>
        </>
    )
}