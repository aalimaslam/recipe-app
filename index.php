<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recipe Web App</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <?php
        include "base.php";
    ?>  
    
    <main>

        <div class="cards-container flex j-between wrap">
            <div class="card border p-20 my-10">
                <div class="img-container">
                    <img src="https://www.themealdb.com/images/media/meals/st1ifa1583267248.jpg" alt="thumbnail">
                </div>
                <div class="text-container">
                    <div class="title p-10">TITLE</div>
                    <div class="description p-10">Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias amet eum veniam libero ab similique. Reiciendis laudantium nobis similique temporibus officiis, fuga mollitia distinctio aspernatur excepturi dicta. Possimus ipsam neque omnis ipsa repudiandae veniam saepe inventore fugit unde fuga voluptatem eius iste quam, sit reiciendis quibusdam nisi nam? Quis minima quia natus non! Aliquam consequatur sit deleniti. Recusandae illo ea magni impedit.</div>
                    <button class="cta mx-10">Read More</button>
                </div>
            </div>
        </div>

    </main>

    <script src="./script.js"></script>
</body>
</html>