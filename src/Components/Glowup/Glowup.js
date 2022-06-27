import image1 from '../../images/image1.jpeg'
import glowupreview from '../../images/glowupreview.mp4'
import './Glowup.scss';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPixel from 'react-facebook-pixel';

const options = {
    autoConfig: true, // set pixel's autoConfig. More info: https://developers.facebook.com/docs/facebook-pixel/advanced/
    debug: false, // enable logs
};

function Glowup(props) {
    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
        ]
    };

    let [name, setName] = useState("")
    let [phoneNo, setPhoneNo] = useState("")
    let [city, setCity] = useState("")
    let [address, setAddress] = useState("")

    let [thankyouPage, setThankyouPage] = useState(false)
    let [buttonDisabled, setButtonDisabled] = useState(false)

    function createRandomNumber() {
        let todayDate = new Date()
        let day = `${todayDate.getDate().toString().length > 1 ? todayDate.getDate() : `0${todayDate.getDate()}`}`
        let month = `${todayDate.getMonth().toString().length > 1 ? todayDate.getMonth() : `0${todayDate.getMonth()}`}`
        let year = todayDate.getFullYear()
        let hours = `${todayDate.getHours().toString().length > 1 ? todayDate.getHours() : `0${todayDate.getHours()}`}`
        let minutes = `${todayDate.getMinutes().toString().length > 1 ? todayDate.getMinutes() : `0${todayDate.getMinutes()}`}`
        let seconds = `${todayDate.getSeconds().toString().length > 1 ? todayDate.getSeconds() : `0${todayDate.getSeconds()}`}`
        let milli = todayDate.getMilliseconds()
        // console.log(`${day}${month}${year}${hours}${minutes}${seconds}${milli}`)
        return `${year}${month}${day}${hours}${minutes}${seconds}${milli}`
    }

    const submitForm = () => {
        setButtonDisabled(true)
        let data = new FormData()
        data.append("name", name)
        data.append("number", phoneNo)
        data.append("city", city)
        data.append("address", address)
        data.append("date", `${new Date()}`)
        data.append("read", "0")
        // if (phoneNo.toString().length < 11) {
        //     document.getElementById("alertDiv").innerHTML = "Invalid Phone Number"
        // } else {
        if (name && phoneNo && city && address) {
            document.getElementById("sendingButton1").innerHTML = "Sending Please Wait"
            let token = createRandomNumber()
            data.append("token", token)
            axios({
                method: 'post',
                url: 'https://butler.attirefits.com/submitform5',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
                data,
            }).then((res) => {
                setName("")
                setPhoneNo("")
                setAddress("")
                setCity("")
                document.getElementById("sendingButton1").innerHTML = "SEND"
                window.location.href = "/glowup/thankyou"
                setButtonDisabled(false)

            }).catch((err) => {
                // console.log(err)
            });

            // setTimeout(() => {

            // }, 1000)
        } else {
            document.getElementById("alertDiv").innerHTML = "All Fields Are Required"
        }
        // }
    }

    useEffect(() => {
        ReactPixel.init('695040181814349', options);
        ReactPixel.pageView();
    }, [])

    return (
        <div className='glowupMain'>
            <div className='bgColor'>
                <h1>Glow Up</h1>
                <h3>Vitamin C Serum</h3>
                <div className='container d-flex'>
                    <div className='imageDiv col-md-6'>
                        <img src={image1} />
                    </div>
                    <div className='col-md-4'>
                        <div class="formDiv">
                            <div>
                                <h2>Book Your Order Now</h2>
                                <p>Rs <b>1900 + 200</b> Delivery Charges</p>
                                <div class="formFields">
                                    <label>
                                        <h6>Your Name</h6>
                                        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" class="form-control" />
                                    </label>
                                    <label>
                                        <h6>Your Mobile Number</h6>
                                        <input value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} type="number" placeholder="Your mobile number" class="form-control" />
                                    </label>
                                    <label>
                                        <h6>Your City</h6>
                                        <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Your city" class="form-control" />
                                    </label>
                                    <label>
                                        <h6>Your Address</h6>
                                        <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Your address" class="form-control" />
                                    </label>
                                    <button id="sendingButton1" onClick={submitForm}>Order Now</button>
                                    <span id="alertDiv" className="alertDiv"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mt-5'>
                <div className='d-flex videoCont'>
                    <div className='col-md-6 tabsDiv'>
                        <nav>
                            <div class="nav nav-tabs" id="nav-tab" role="tablist">
                                <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Key Benefits</button>
                                <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Ingredients</button>
                                <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">How to apply</button>
                            </div>
                        </nav>
                        <div class="tab-content" id="nav-tabContent">
                            <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                <ul>
                                    <li>
                                        <b>Fights Free Radicals</b> Vitamin C, vitamin E, and hyaluronic acid are shown to work synergistically to neutralize free radical damage, helping ward off premature aging.
                                    </li>
                                    <li>
                                        <b>Brightens and Evens Tone</b> Vitamin C is famous for evening out dark spots and enhancing skin's natural radiance, thanks to its reputation for inhibiting melanin.
                                    </li>
                                    <li>
                                        <b>Reduces Signs of Aging</b> By supporting collagen and elastin, this potent antioxidant blend promotes healthy elasticity to boost firmness and soften the look of fine lines.
                                    </li>
                                </ul>
                            </div>
                            <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                <h4>VITAMIN C SERUM FOR FACE INGREDIENTS</h4>
                                <p>
                                    Organic Deionized Herbal Infusion *, Organic Aloe Barbadensis Leaf (Aloe), Sodium Ascorbyl Phosphate (Vitamin C), MSM (Methylsulfonylmethane), Botanical Hyaluronic Acid, Witch Hazel (Hamamelis Virginiana), Vitamin E (d-alpha Tocopheryl Acetate), Kosher Vegetable Glycerol, Carbomer, (2s)-2-Amino-5-guanidinopentanoic Acid, Organic Jojoba Oil (Organic Simmondsia Chinensis), Phenoxyethanol, Ethyl Hexyl Glycerol * Water, Organic Aloe, Organic Gotu Kola, Wildcrafted Organic Equisetum Arvense (Horsetail), Wildcrafted Organic Dandelion, and Wildcrafted Organic Geranium
                                </p>
                            </div>
                            <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                <h4>HOW TO APPLY THE VITAMIN C SERUM FOR FACE</h4>
                                <p>
                                    After cleansing and toning skin, apply 3-5 drops of serum to clean fingertips, palm, or back of hands. Using fingertips, gently smooth serum onto clean face and under eyes. Avoid direct contact with eyes. Allow to fully absorb, then follow with your glowup.
                                    <br />
                                    * Always perform a patch test 24 hours in advance of full application. This product can be used morning and/or night.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='videoDiv col-md-6'>
                        <video controls loop={true} autoPlay={true} muted width="100%" height="320">
                            <source autoPlay={true} src={glowupreview} type="video/mp4" />
                        </video>
                    </div>
                </div>

                <div className='reviewSection container'>
                    <h1>Reviews</h1>
                    <Slider autoplay {...settings}>
                        <div className='col-md-12'>
                            <div className='reviewDiv'>
                                <h3>Abu Bakar Yousuf</h3>
                                <p>
                                    My wife and I both tried this serum. We are in our 50s and wrinkles have started. This serum does reduce wrinkles and fine line over time. We have noticed an improvement. It's very gentle on the skin, not causing any irritation. This Serum has a very light floral scent, nothing over powering. My wife uses this under her moisturizer with great results. It absorbs into the skin and isn't greasy. The eye drop applicator is much appreciated because none is wasted. It helps apply optimally. Yes, this serum is a bit on the pricey side but it's worth it. This is one product which actually works as promised.
                                </p>
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <div className='reviewDiv'>
                                <h3>Samina Shaikh</h3>
                                <p>
                                    I struggle with patchy red tones on my face. I also struggle with breakouts and major uneven skin tones. This serum really does work. I saw overnight results the time I wore this. I like to apply this in the evening right before going to bed so that it has all night to soak in. The first time I woke up after applying this, my skin nicked a lot more clear, smooth and the red patches had lessened.
                                    <br />
                                    I have used many many products like this but this is one of my favorites and I believe this is one of the best ones regarding price. Typically, products with these very ingredients and size cost double the amount. This one is a great deal.
                                </p>
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <div className='reviewDiv'>
                                <h3>Humera Khan</h3>
                                <p>
                                    Pimples aur allergy ki waja se meri skin bohat kharab rehti thi - kaafi doctors ko dikhaya but koi khas aram nahe arah tha. finally glow up ka istamal shuro kiya hai aur skin pehle se glow aur behtar horahi hai. highly recommended.
                                </p>
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <div className='reviewDiv'>
                                <h3>Anaya Shah</h3>
                                <p>
                                    I’m on my third bottle of this, because I stray and try other vitamin C or retinol serums but nothing delivers like this one for me. I use this at night and I see results the next day, and in a few days I usually get compliments about how my skin is glowing. It just looks clearer and brighter. It also doesn’t irritate my skin and doesn’t cause breakouts. Highly recommended.
                                </p>
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <div className='reviewDiv'>
                                <h3>Ayesha Rana</h3>
                                <p>
                                    Glow up vitamin C serum mjhe meri dost ne recommend kiya tha. mera online order ka experience kabhi acha nahe raha but is bar to such mai ye product boht achi nikle aur iske results bhi khaatir khawah hain. good product.
                                </p>
                            </div>
                        </div>

                        <div className='col-md-12'>
                            <div className='reviewDiv'>
                                <h3>Tahira Azam</h3>
                                <p>
                                    An excellent solution for all my skin problems. It reduce pores and remove acne spots. Results are visible in just three weeks. My skin is getting brighter day by day.😍
                                </p>
                            </div>
                        </div>
                    </Slider>
                </div>
                {/* <div className='col-md-12'>
                    <div class="image-grid">
                        <div class="image-row">
                            <div class="image image-01"></div>
                            <div class="image image-02"></div>
                            <div class="image image-03"></div>
                        </div>
                        <div class="image-row">
                            <div class="image image-04"></div>
                            <div class="image image-05"></div>
                        </div>
                        <div class="image-row">
                            <div class="image image-06"></div>
                            <div class="image image-07"></div>
                            <div class="image image-08"></div>
                            <div class="image image-09"></div>
                        </div>
                        <div class="image-row">
                            <div class="image image-10"></div>
                            <div class="image image-11"></div>
                            <div class="image image-12"></div>
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
}

export default Glowup;
