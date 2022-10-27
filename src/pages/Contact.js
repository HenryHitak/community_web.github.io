export default function Contact(){
    return(
        <>
            <section className="contact">
                <h1>Contact Us</h1>
                <form>
                    <input type="name" name="name" id="name" placeholder="Name"/>
                    <input type="email" name="email" id="email" placeholder="Email"/>
                    <textarea name="message" id="message" placeholder="Message"></textarea>
                    <button type="submit" id="send">Send message</button>
                </form>
            </section>

            
        </>
    )
}