<header>
    <nav>
        <div class="logo" onclick="window.open('./index.php');">RECIPE APP</div>
    </nav>
</header>
<?php
    $title = $_POST["title"];
    $description = $_POST["description"];
    $splittedString = explode("STEP",$description);
    $area =  $_POST["area"];
    $category =  $_POST["category"];
    $imageUrl =  $_POST["imageUrl"];
    $cardID =  $_POST["cardCount"];
    if(!$splittedString){
        $splittedString = explode(".",$description);
    }
    $ingredients =  $_POST["ingredients"];
    $splittedIngredients = explode(",", $ingredients);
?>

<link rel="stylesheet" href="recipe.css">

<main class="recipe-main flex">
    <div class="image-container">
        <img src="<?php echo  $imageUrl ?>"/>
    </div>
    <div class="text-container p-20">
        <h1 class="title p-10">
            <?php echo  $title ?>
        </h1>
        <small class='p-10'>
            <?php echo  $area ?> ,
        </small>
        <small class='p-10'>
            <?php echo  $category ?>
        </small>
        <ul class="p-20">
            <li class="heading">Ingredients</li>
            <?php
                for($i=0; $i < sizeof($splittedIngredients); $i++){
                    echo "<li> $splittedIngredients[$i] </li>";
                }
            ?>
        </ul>
        <p class="description p-10">
            <?php for ($i=0; $i < sizeof($splittedString); $i++) { 
                echo "$splittedString[$i] <br><br>";
            } ?>
        </p>
    </div>
</main>

<!-- //Ingredients pending -->
