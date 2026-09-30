/**
 * MathQuest Kingdom — Question Bank
 * 150+ Grade 6-7 math questions (5 categories) + 80+ logic reasoning questions
 */
(function () {
    'use strict';
    window.Game = window.Game || {};
    /* ══════════════════════════════════════
       MATH QUESTIONS — by level
       ══════════════════════════════════════ */
    var mathQuestions = {
        /* ── Level 0: Fractions & Decimals ── */
        0: [
            { question: 'What is 1/4 + 1/2?', options: ['3/4', '2/6', '1/3', '2/4'], answer: '3/4', explanation: '1/4 + 2/4 = 3/4' },
            { question: 'Simplify: 12/18', options: ['2/3', '3/4', '4/6', '6/9'], answer: '2/3', explanation: 'GCD of 12 and 18 is 6; 12÷6 / 18÷6 = 2/3' },
            { question: 'What is 3/5 × 2/3?', options: ['2/5', '6/15', '1/5', '5/6'], answer: '2/5', explanation: '(3×2)/(5×3) = 6/15 = 2/5' },
            { question: 'Convert 0.75 to a fraction.', options: ['3/4', '7/5', '3/5', '7/10'], answer: '3/4', explanation: '0.75 = 75/100 = 3/4' },
            { question: 'What is 5/6 − 1/3?', options: ['1/2', '4/6', '2/3', '1/6'], answer: '1/2', explanation: '5/6 − 2/6 = 3/6 = 1/2' },
            { question: 'Convert 3/8 to a decimal.', options: ['0.375', '0.38', '0.35', '0.325'], answer: '0.375', explanation: '3 ÷ 8 = 0.375' },
            { question: 'What is 2/7 + 3/7?', options: ['5/7', '5/14', '6/7', '1'], answer: '5/7', explanation: 'Same denominator: (2+3)/7 = 5/7' },
            { question: 'What is 4/5 ÷ 2/3?', options: ['6/5', '8/15', '2/5', '12/10'], answer: '6/5', explanation: '4/5 × 3/2 = 12/10 = 6/5' },
            { question: 'Which is larger: 3/5 or 5/8?', options: ['5/8', '3/5', 'They are equal', 'Cannot tell'], answer: '5/8', explanation: '3/5 = 0.6 and 5/8 = 0.625' },
            { question: 'What is 1 2/3 as an improper fraction?', options: ['5/3', '3/2', '7/3', '4/3'], answer: '5/3', explanation: '1 × 3 + 2 = 5, so 5/3' },
            { question: 'What is 0.125 as a fraction?', options: ['1/8', '1/5', '1/4', '1/10'], answer: '1/8', explanation: '0.125 = 125/1000 = 1/8' },
            { question: 'What is 7/8 − 3/8?', options: ['1/2', '4/8', '4/16', '3/8'], answer: '1/2', explanation: '(7−3)/8 = 4/8 = 1/2' },
            { question: 'What is 2/3 × 3/4?', options: ['1/2', '6/12', '5/7', '2/4'], answer: '1/2', explanation: '6/12 = 1/2' },
            { question: 'Convert 7/20 to a decimal.', options: ['0.35', '0.7', '0.37', '0.357'], answer: '0.35', explanation: '7 ÷ 20 = 0.35' },
            { question: 'What is 3 1/4 − 1 3/4?', options: ['1 1/2', '2 1/4', '1 3/4', '2'], answer: '1 1/2', explanation: '13/4 − 7/4 = 6/4 = 1 1/2' },
            { question: 'What is 5/12 + 1/4?', options: ['2/3', '6/16', '8/12', '1/2'], answer: '2/3', explanation: '5/12 + 3/12 = 8/12 = 2/3' },
            { question: 'Convert 1.6 to a fraction.', options: ['8/5', '16/10', '6/10', '3/2'], answer: '8/5', explanation: '1.6 = 16/10 = 8/5' },
            { question: 'What is 9/10 ÷ 3/5?', options: ['3/2', '27/50', '9/6', '12/10'], answer: '3/2', explanation: '9/10 × 5/3 = 45/30 = 3/2' },
            { question: 'Which fraction equals 0.4?', options: ['2/5', '4/5', '1/4', '2/4'], answer: '2/5', explanation: '2 ÷ 5 = 0.4' },
            { question: 'What is 11/15 − 2/5?', options: ['1/3', '9/15', '3/5', '1/5'], answer: '1/3', explanation: '11/15 − 6/15 = 5/15 = 1/3' },
            { question: 'What is 3/4 + 5/8?', options: ['11/8', '8/12', '1/2', '15/32'], answer: '11/8', explanation: '6/8 + 5/8 = 11/8' },
            { question: 'Convert 2 1/5 to a decimal.', options: ['2.2', '2.15', '2.5', '2.02'], answer: '2.2', explanation: '1/5 = 0.2, so 2 + 0.2 = 2.2' },
            { question: 'What is 1/6 + 1/3?', options: ['1/2', '2/9', '1/3', '2/6'], answer: '1/2', explanation: '1/6 + 2/6 = 3/6 = 1/2' },
            { question: 'What is 4/9 × 3?', options: ['4/3', '12/9', '12/27', '1/3'], answer: '4/3', explanation: '(4×3)/9 = 12/9 = 4/3' },
            { question: 'Simplify: 24/36', options: ['2/3', '4/6', '3/4', '12/18'], answer: '2/3', explanation: 'GCD = 12; 24/12 = 2, 36/12 = 3' },
            { question: 'What is 0.6 + 0.375?', options: ['0.975', '1.0', '0.935', '0.675'], answer: '0.975', explanation: '0.600 + 0.375 = 0.975' },
            { question: 'What is 7/10 − 0.3?', options: ['0.4', '2/5', '0.5', '1/4'], answer: '2/5', explanation: '0.7 − 0.3 = 0.4 = 2/5' },
            { question: 'Order from least to greatest: 1/3, 1/4, 2/5', options: ['1/4, 1/3, 2/5', '1/3, 1/4, 2/5', '2/5, 1/3, 1/4', '1/4, 2/5, 1/3'], answer: '1/4, 1/3, 2/5', explanation: '0.25, 0.333, 0.4' },
            { question: 'What is 5/6 × 6/7?', options: ['5/7', '30/42', '6/7', '1'], answer: '5/7', explanation: '30/42 = 5/7' },
            { question: 'What is 1/2 ÷ 1/4?', options: ['2', '1/8', '4', '1/2'], answer: '2', explanation: '1/2 × 4/1 = 4/2 = 2' },
            { question: 'Convert 11/4 to a mixed number.', options: ['2 3/4', '3 1/4', '2 1/2', '1 3/4'], answer: '2 3/4', explanation: '11 ÷ 4 = 2 remainder 3' }
        ],
        /* ── Level 1: Ratios & Proportions ── */
        1: [
            { question: 'Simplify the ratio 12:8', options: ['3:2', '6:4', '4:3', '2:1'], answer: '3:2', explanation: 'GCD = 4; 12/4 : 8/4 = 3:2' },
            { question: 'If the ratio of cats to dogs is 3:5 and there are 24 cats, how many dogs are there?', options: ['40', '30', '35', '45'], answer: '40', explanation: '24/3 = 8; 5 × 8 = 40' },
            { question: 'Simplify: 18:27', options: ['2:3', '3:4', '6:9', '9:13'], answer: '2:3', explanation: 'GCD = 9; 18/9 : 27/9 = 2:3' },
            { question: 'A recipe calls for 2 cups of flour for every 3 cups of sugar. How many cups of flour for 12 cups of sugar?', options: ['8', '6', '10', '9'], answer: '8', explanation: '12/3 = 4; 2 × 4 = 8' },
            { question: 'What is the unit rate if 150 km are covered in 3 hours?', options: ['50 km/h', '45 km/h', '75 km/h', '60 km/h'], answer: '50 km/h', explanation: '150 ÷ 3 = 50' },
            { question: 'If 5 pens cost $15, how much do 8 pens cost?', options: ['$24', '$20', '$30', '$18'], answer: '$24', explanation: '$15/5 = $3 each; 8 × $3 = $24' },
            { question: 'The ratio of boys to girls in a class is 4:5. If there are 20 girls, how many boys?', options: ['16', '15', '18', '25'], answer: '16', explanation: '20/5 = 4; 4 × 4 = 16' },
            { question: 'Simplify: 45:60', options: ['3:4', '9:12', '4:5', '5:6'], answer: '3:4', explanation: 'GCD = 15; 45/15 : 60/15 = 3:4' },
            { question: 'If a map scale is 1:50000, what real distance does 3 cm represent?', options: ['1.5 km', '15 km', '150 m', '1500 m'], answer: '1.5 km', explanation: '3 × 50000 = 150000 cm = 1500 m = 1.5 km' },
            { question: 'Divide $180 in the ratio 2:3:4. What is the largest share?', options: ['$80', '$60', '$40', '$90'], answer: '$80', explanation: '2+3+4=9; 180/9=20; 4×20=$80' },
            { question: 'If 3 workers can paint a room in 6 hours, how long would 9 workers take?', options: ['2 hours', '3 hours', '4 hours', '18 hours'], answer: '2 hours', explanation: '3 × 6 = 18 worker-hours; 18/9 = 2 hours' },
            { question: 'Express 2:5 as a fraction.', options: ['2/5', '5/2', '2/7', '5/7'], answer: '2/5', explanation: '2:5 = 2/5' },
            { question: 'A car travels 240 km on 20 liters of fuel. How far on 35 liters?', options: ['420 km', '360 km', '480 km', '300 km'], answer: '420 km', explanation: '240/20=12 km/L; 12×35=420' },
            { question: 'The ratio of red to blue marbles is 7:3. If there are 50 total, how many red?', options: ['35', '30', '25', '40'], answer: '35', explanation: '50/(7+3) = 5; 7×5 = 35' },
            { question: 'Solve: x/4 = 15/20', options: ['3', '4', '5', '12'], answer: '3', explanation: '15/20 = 3/4; so x = 3' },
            { question: 'If 12 apples cost $9, how much do 20 apples cost?', options: ['$15', '$12', '$18', '$16'], answer: '$15', explanation: '$9/12 = $0.75; 20 × $0.75 = $15' },
            { question: 'A photo measuring 4cm × 6cm is enlarged in the ratio 3:1. What are the new dimensions?', options: ['12cm × 18cm', '7cm × 9cm', '8cm × 12cm', '16cm × 24cm'], answer: '12cm × 18cm', explanation: '4×3 = 12, 6×3 = 18' },
            { question: 'The ratio of two numbers is 5:8. If the smaller number is 35, what is the larger?', options: ['56', '48', '64', '40'], answer: '56', explanation: '35/5 = 7; 8×7 = 56' },
            { question: 'Write 0.6 as a ratio of whole numbers.', options: ['3:5', '6:10', '2:3', '1:6'], answer: '3:5', explanation: '0.6 = 6/10 = 3/5 → 3:5' },
            { question: 'In a school, the teacher to student ratio is 1:15. If there are 450 students, how many teachers?', options: ['30', '25', '35', '45'], answer: '30', explanation: '450/15 = 30' },
            { question: 'Solve the proportion: 6/x = 9/12', options: ['8', '6', '10', '18'], answer: '8', explanation: '6 × 12 = 9x; 72 = 9x; x = 8' },
            { question: 'Mix paint in the ratio red:white = 2:5. How much red for 35 mL of white?', options: ['14 mL', '10 mL', '12 mL', '7 mL'], answer: '14 mL', explanation: '35/5 = 7; 2×7 = 14' },
            { question: 'If 7 notebooks cost $21, what is the cost of 1 notebook?', options: ['$3', '$2.50', '$3.50', '$4'], answer: '$3', explanation: '$21/7 = $3' },
            { question: 'Simplify: 100:250', options: ['2:5', '1:2.5', '4:10', '10:25'], answer: '2:5', explanation: 'GCD = 50; 100/50 : 250/50 = 2:5' },
            { question: 'A model car is 1:25 scale. If the model is 18cm long, how long is the real car?', options: ['4.5 m', '45 m', '450 cm', '0.45 m'], answer: '4.5 m', explanation: '18 × 25 = 450 cm = 4.5 m' },
            { question: 'Divide 72 in the ratio 5:3. What is the smaller part?', options: ['27', '45', '36', '24'], answer: '27', explanation: '72/(5+3) = 9; 3×9 = 27' },
            { question: 'If y/6 = 10/15, find y.', options: ['4', '5', '6', '3'], answer: '4', explanation: '10/15 = 2/3; y = 6 × 2/3 = 4' },
            { question: 'A train travels 360 km in 4 hours. At the same speed, how far in 7 hours?', options: ['630 km', '720 km', '560 km', '840 km'], answer: '630 km', explanation: '360/4 = 90 km/h; 90×7 = 630' },
            { question: 'The ratio of ages of Tom and Jerry is 3:2. If Tom is 18, how old is Jerry?', options: ['12', '14', '10', '9'], answer: '12', explanation: '18/3 = 6; 2×6 = 12' },
            { question: 'Which ratio is equivalent to 4:6?', options: ['10:15', '8:14', '6:10', '5:6'], answer: '10:15', explanation: '4:6 = 2:3; 10:15 = 2:3' },
            { question: 'If 4 kg of rice costs $12, how much does 7 kg cost?', options: ['$21', '$24', '$18', '$28'], answer: '$21', explanation: '$12/4 = $3/kg; 7×$3 = $21' }
        ],
        /* ── Level 2: Percentages ── */
        2: [
            { question: 'What is 25% of 200?', options: ['50', '40', '75', '25'], answer: '50', explanation: '200 × 0.25 = 50' },
            { question: 'A shirt costs $80 with 15% off. What is the sale price?', options: ['$68', '$72', '$65', '$70'], answer: '$68', explanation: '$80 × 0.15 = $12; $80 − $12 = $68' },
            { question: 'What is 35% of 240?', options: ['84', '72', '96', '60'], answer: '84', explanation: '240 × 0.35 = 84' },
            { question: 'Convert 3/5 to a percentage.', options: ['60%', '55%', '65%', '50%'], answer: '60%', explanation: '3/5 = 0.6 = 60%' },
            { question: 'A price went from $50 to $60. What is the percentage increase?', options: ['20%', '10%', '15%', '25%'], answer: '20%', explanation: '(60−50)/50 × 100 = 20%' },
            { question: 'What percentage of 80 is 20?', options: ['25%', '20%', '30%', '15%'], answer: '25%', explanation: '20/80 × 100 = 25%' },
            { question: 'Find the simple interest on $500 at 4% per year for 3 years.', options: ['$60', '$50', '$45', '$80'], answer: '$60', explanation: 'I = 500 × 0.04 × 3 = $60' },
            { question: 'A test has 40 questions. You got 32 correct. What percentage?', options: ['80%', '75%', '85%', '70%'], answer: '80%', explanation: '32/40 × 100 = 80%' },
            { question: 'Convert 0.045 to a percentage.', options: ['4.5%', '0.45%', '45%', '0.045%'], answer: '4.5%', explanation: '0.045 × 100 = 4.5%' },
            { question: 'A population of 10,000 decreases by 8%. What is the new population?', options: ['9,200', '9,800', '9,000', '8,800'], answer: '9,200', explanation: '10000 × 0.08 = 800; 10000 − 800 = 9200' },
            { question: 'What is 120% of 50?', options: ['60', '55', '65', '72'], answer: '60', explanation: '50 × 1.2 = 60' },
            { question: 'A shop gives a 20% discount then charges 10% tax. What is the final price of a $100 item?', options: ['$88', '$90', '$92', '$85'], answer: '$88', explanation: '$100 × 0.8 = $80; $80 × 1.1 = $88' },
            { question: 'Convert 7/8 to a percentage.', options: ['87.5%', '85%', '78%', '90%'], answer: '87.5%', explanation: '7/8 = 0.875 = 87.5%' },
            { question: 'What number is 40% of 150?', options: ['60', '75', '45', '55'], answer: '60', explanation: '150 × 0.4 = 60' },
            { question: 'If 60% of a number is 42, what is the number?', options: ['70', '65', '80', '75'], answer: '70', explanation: '42/0.6 = 70' },
            { question: 'A meal costs $45. You tip 18%. How much is the tip?', options: ['$8.10', '$9.00', '$7.50', '$8.50'], answer: '$8.10', explanation: '$45 × 0.18 = $8.10' },
            { question: 'Convert 45% to a fraction in lowest terms.', options: ['9/20', '45/100', '4/9', '1/2'], answer: '9/20', explanation: '45/100 = 9/20' },
            { question: 'A $250 jacket is marked up 30%. What is the new price?', options: ['$325', '$300', '$350', '$280'], answer: '$325', explanation: '$250 × 1.3 = $325' },
            { question: 'What is 12.5% of 400?', options: ['50', '48', '55', '40'], answer: '50', explanation: '400 × 0.125 = 50' },
            { question: 'Sales tax is 8%. An item costs $75 before tax. Total cost?', options: ['$81', '$83', '$80', '$78'], answer: '$81', explanation: '$75 × 1.08 = $81' },
            { question: 'A score went from 60 to 45. What is the percentage decrease?', options: ['25%', '20%', '30%', '15%'], answer: '25%', explanation: '(60−45)/60 × 100 = 25%' },
            { question: 'Find simple interest on $1,200 at 5% per year for 2 years.', options: ['$120', '$100', '$60', '$150'], answer: '$120', explanation: 'I = 1200 × 0.05 × 2 = $120' },
            { question: '30 is what percent of 120?', options: ['25%', '30%', '20%', '35%'], answer: '25%', explanation: '30/120 × 100 = 25%' },
            { question: 'A bicycle was $300, now $240. What was the discount percentage?', options: ['20%', '25%', '15%', '30%'], answer: '20%', explanation: '(300−240)/300 × 100 = 20%' },
            { question: 'What is 5% of 5,000?', options: ['250', '500', '50', '25'], answer: '250', explanation: '5000 × 0.05 = 250' },
            { question: 'Convert 0.8 to a percentage.', options: ['80%', '8%', '0.8%', '800%'], answer: '80%', explanation: '0.8 × 100 = 80%' },
            { question: 'A laptop costs $800 with 6% tax. What is the total?', options: ['$848', '$856', '$836', '$860'], answer: '$848', explanation: '$800 × 1.06 = $848' },
            { question: 'If a bank gives 3% annual interest, how much interest on $2,000 in 1 year?', options: ['$60', '$30', '$600', '$6'], answer: '$60', explanation: '$2000 × 0.03 = $60' },
            { question: 'What is 150% of 60?', options: ['90', '80', '100', '75'], answer: '90', explanation: '60 × 1.5 = 90' },
            { question: 'A school has 600 students. 55% are girls. How many boys?', options: ['270', '330', '300', '250'], answer: '270', explanation: '45% boys; 600 × 0.45 = 270' },
            { question: 'Express 2/25 as a percentage.', options: ['8%', '10%', '4%', '25%'], answer: '8%', explanation: '2/25 = 0.08 = 8%' }
        ],
        /* ── Level 3: Geometry & Angles ── */
        3: [
            { question: 'Find the area of a triangle with base 12 cm and height 8 cm.', options: ['48 cm²', '96 cm²', '40 cm²', '24 cm²'], answer: '48 cm²', explanation: '½ × 12 × 8 = 48' },
            { question: 'What is the perimeter of a rectangle that is 15 cm long and 8 cm wide?', options: ['46 cm', '120 cm', '23 cm', '38 cm'], answer: '46 cm', explanation: '2(15 + 8) = 46' },
            { question: 'What is the sum of interior angles of a triangle?', options: ['180°', '360°', '90°', '270°'], answer: '180°', explanation: 'All triangles have angles summing to 180°' },
            { question: 'Find the area of a circle with radius 7 cm (use π ≈ 22/7).', options: ['154 cm²', '44 cm²', '49 cm²', '308 cm²'], answer: '154 cm²', explanation: 'π × 7² = 22/7 × 49 = 154' },
            { question: 'Two angles are supplementary. One is 65°. What is the other?', options: ['115°', '125°', '25°', '295°'], answer: '115°', explanation: '180° − 65° = 115°' },
            { question: 'What is the volume of a rectangular prism 5cm × 4cm × 3cm?', options: ['60 cm³', '48 cm³', '12 cm³', '120 cm³'], answer: '60 cm³', explanation: '5 × 4 × 3 = 60' },
            { question: 'What is the circumference of a circle with diameter 14 cm? (π ≈ 22/7)', options: ['44 cm', '88 cm', '22 cm', '154 cm'], answer: '44 cm', explanation: 'π × d = 22/7 × 14 = 44' },
            { question: 'Find the area of a parallelogram with base 10 cm and height 6 cm.', options: ['60 cm²', '16 cm²', '30 cm²', '32 cm²'], answer: '60 cm²', explanation: 'base × height = 10 × 6 = 60' },
            { question: 'What is the sum of interior angles of a hexagon?', options: ['720°', '540°', '1080°', '360°'], answer: '720°', explanation: '(6−2) × 180° = 720°' },
            { question: 'An angle of 35° has what complement?', options: ['55°', '145°', '65°', '325°'], answer: '55°', explanation: '90° − 35° = 55°' },
            { question: 'Find the area of a trapezoid with parallel sides 8 cm and 12 cm, and height 5 cm.', options: ['50 cm²', '60 cm²', '40 cm²', '100 cm²'], answer: '50 cm²', explanation: '½ × (8+12) × 5 = 50' },
            { question: 'What is the perimeter of a square with side 9.5 cm?', options: ['38 cm', '36 cm', '40 cm', '19 cm'], answer: '38 cm', explanation: '4 × 9.5 = 38' },
            { question: 'If one angle in a right triangle is 40°, what is the third angle?', options: ['50°', '60°', '40°', '140°'], answer: '50°', explanation: '180 − 90 − 40 = 50°' },
            { question: 'Find the volume of a cube with edge 6 cm.', options: ['216 cm³', '36 cm³', '72 cm³', '108 cm³'], answer: '216 cm³', explanation: '6³ = 216' },
            { question: 'The perimeter of a regular pentagon is 45 cm. What is each side length?', options: ['9 cm', '10 cm', '7.5 cm', '15 cm'], answer: '9 cm', explanation: '45/5 = 9' },
            { question: 'What is the area of a square with diagonal 10 cm?', options: ['50 cm²', '100 cm²', '25 cm²', '75 cm²'], answer: '50 cm²', explanation: 'Area = d²/2 = 100/2 = 50' },
            { question: 'Sum of interior angles of a pentagon?', options: ['540°', '720°', '360°', '900°'], answer: '540°', explanation: '(5−2) × 180° = 540°' },
            { question: 'A cylinder has radius 3 cm and height 10 cm. Find its volume. (π ≈ 3.14)', options: ['282.6 cm³', '94.2 cm³', '188.4 cm³', '314 cm³'], answer: '282.6 cm³', explanation: 'π × 3² × 10 = 282.6' },
            { question: 'Find the hypotenuse of a right triangle with legs 3 cm and 4 cm.', options: ['5 cm', '6 cm', '7 cm', '12 cm'], answer: '5 cm', explanation: '√(9+16) = √25 = 5' },
            { question: 'What type of angle is 135°?', options: ['Obtuse', 'Acute', 'Right', 'Reflex'], answer: 'Obtuse', explanation: 'Between 90° and 180° is obtuse' },
            { question: 'Find the area of a circle with diameter 10 cm. (π ≈ 3.14)', options: ['78.5 cm²', '31.4 cm²', '157 cm²', '314 cm²'], answer: '78.5 cm²', explanation: 'π × 5² = 3.14 × 25 = 78.5' },
            { question: 'Each interior angle of a regular hexagon is:', options: ['120°', '135°', '90°', '108°'], answer: '120°', explanation: '720° ÷ 6 = 120°' },
            { question: 'The hypotenuse of a right triangle is 13 cm and one leg is 5 cm. Find the other leg.', options: ['12 cm', '8 cm', '10 cm', '11 cm'], answer: '12 cm', explanation: '√(169−25) = √144 = 12' },
            { question: 'What is the perimeter of a semicircle with diameter 14 cm? (π ≈ 22/7)', options: ['36 cm', '22 cm', '44 cm', '58 cm'], answer: '36 cm', explanation: 'Half circumference + diameter = 22 + 14 = 36' },
            { question: 'Find the surface area of a cube with edge 4 cm.', options: ['96 cm²', '64 cm²', '16 cm²', '24 cm²'], answer: '96 cm²', explanation: '6 × 4² = 6 × 16 = 96' },
            { question: 'Vertically opposite angles: one is 72°. What is the other?', options: ['72°', '108°', '18°', '288°'], answer: '72°', explanation: 'Vertically opposite angles are equal' },
            { question: 'The base of a triangle is 16 cm and its area is 80 cm². What is the height?', options: ['10 cm', '5 cm', '8 cm', '16 cm'], answer: '10 cm', explanation: '80 = ½ × 16 × h; h = 10' },
            { question: 'What is the sum of exterior angles of any polygon?', options: ['360°', '180°', '720°', '540°'], answer: '360°', explanation: 'Exterior angles always sum to 360°' },
            { question: 'Find the area of a rhombus with diagonals 10 cm and 14 cm.', options: ['70 cm²', '140 cm²', '35 cm²', '24 cm²'], answer: '70 cm²', explanation: '½ × 10 × 14 = 70' },
            { question: 'Volume of a triangular prism with base area 24 cm² and length 10 cm?', options: ['240 cm³', '120 cm³', '34 cm³', '480 cm³'], answer: '240 cm³', explanation: '24 × 10 = 240' },
            { question: 'An isosceles triangle has two angles of 70° each. What is the third?', options: ['40°', '70°', '50°', '110°'], answer: '40°', explanation: '180 − 70 − 70 = 40°' }
        ],
        /* ── Level 4: Mixed (all topics, harder) ── */
        4: [
            { question: 'If 3/x = 12/20, find x.', options: ['5', '4', '6', '8'], answer: '5', explanation: '12x = 60; x = 5' },
            { question: 'A 40% discount followed by 10% tax on $200 gives a final price of?', options: ['$132', '$108', '$120', '$140'], answer: '$132', explanation: '$200 × 0.6 = $120; $120 × 1.1 = $132' },
            { question: 'The area of a triangle is 36 cm² and its base is 9 cm. Find the height.', options: ['8 cm', '4 cm', '6 cm', '12 cm'], answer: '8 cm', explanation: '36 = ½ × 9 × h; h = 8' },
            { question: 'Express 7:4 as a percentage of the total.', options: ['63.6% and 36.4%', '70% and 40%', '75% and 25%', '58% and 42%'], answer: '63.6% and 36.4%', explanation: '7/(7+4) ≈ 0.636; 4/11 ≈ 0.364' },
            { question: 'What is 2/3 of 45% of 300?', options: ['90', '100', '135', '60'], answer: '90', explanation: '45% of 300 = 135; 2/3 × 135 = 90' },
            { question: 'A circle has circumference 31.4 cm. What is its radius? (π ≈ 3.14)', options: ['5 cm', '10 cm', '7 cm', '15 cm'], answer: '5 cm', explanation: 'C = 2πr; 31.4 = 6.28r; r = 5' },
            { question: 'Simplify: 3/4 ÷ 9/16', options: ['4/3', '3/4', '27/64', '12/9'], answer: '4/3', explanation: '3/4 × 16/9 = 48/36 = 4/3' },
            { question: 'A tank holds 2,400 liters. 35% is used. How many liters remain?', options: ['1,560', '840', '1,200', '1,680'], answer: '1,560', explanation: '65% remains; 2400 × 0.65 = 1560' },
            { question: 'The angles of a quadrilateral are x, 2x, 3x, and 4x. Find x.', options: ['36°', '40°', '45°', '30°'], answer: '36°', explanation: 'x+2x+3x+4x = 360; 10x = 360; x = 36' },
            { question: 'Divide $240 in ratio 3:5. What is the difference between the shares?', options: ['$60', '$90', '$120', '$30'], answer: '$60', explanation: '240/8=30; shares: 90 and 150; diff = 60' },
            { question: 'What is 5/8 + 3/4 − 1/2?', options: ['7/8', '3/4', '1', '5/8'], answer: '7/8', explanation: '5/8 + 6/8 − 4/8 = 7/8' },
            { question: 'A price increased by 25% to $75. What was the original price?', options: ['$60', '$50', '$56.25', '$65'], answer: '$60', explanation: '75/1.25 = 60' },
            { question: 'Find the perimeter of a triangle with sides 3.5, 4.2, and 5.3 cm.', options: ['13 cm', '12 cm', '14 cm', '11 cm'], answer: '13 cm', explanation: '3.5 + 4.2 + 5.3 = 13' },
            { question: 'If the ratio of A to B is 5:3, and B is 27, what is A + B?', options: ['72', '45', '54', '60'], answer: '72', explanation: '27/3 = 9; A = 45; A+B = 72' },
            { question: 'What is 0.6 × 0.25 as a fraction?', options: ['3/20', '15/100', '3/10', '1/6'], answer: '3/20', explanation: '0.6 × 0.25 = 0.15 = 15/100 = 3/20' },
            { question: 'A rectangular garden is 12 m × 8 m. A path 1 m wide surrounds it. Find the path area.', options: ['44 m²', '40 m²', '48 m²', '36 m²'], answer: '44 m²', explanation: 'Outer: 14×10=140; Inner: 12×8=96; Path: 44' },
            { question: 'Convert 5/6 to a percentage (round to 1 decimal).', options: ['83.3%', '80%', '85%', '66.7%'], answer: '83.3%', explanation: '5/6 ≈ 0.8333 = 83.3%' },
            { question: 'Simple interest on $800 at 6.5% for 4 years?', options: ['$208', '$200', '$52', '$312'], answer: '$208', explanation: 'I = 800 × 0.065 × 4 = $208' },
            { question: 'Volume of a cylinder with radius 5 cm and height 12 cm? (π ≈ 3.14)', options: ['942 cm³', '188.4 cm³', '300 cm³', '1884 cm³'], answer: '942 cm³', explanation: 'π × 25 × 12 = 942' },
            { question: 'The scale on a map is 1:25000. Two towns are 8 cm apart. Real distance?', options: ['2 km', '200 m', '20 km', '0.2 km'], answer: '2 km', explanation: '8 × 25000 = 200000 cm = 2 km' },
            { question: 'What is 3 1/2 × 2 2/5?', options: ['8 2/5', '5 9/10', '6 1/2', '7'], answer: '8 2/5', explanation: '7/2 × 12/5 = 84/10 = 42/5 = 8 2/5' },
            { question: 'A shop sold 480 items. 60% were books, the rest were toys. How many toys?', options: ['192', '288', '200', '180'], answer: '192', explanation: '40% × 480 = 192' },
            { question: 'Exterior angle of a regular octagon?', options: ['45°', '135°', '40°', '60°'], answer: '45°', explanation: '360° / 8 = 45°' },
            { question: 'Find x: 2x/3 = 18', options: ['27', '12', '36', '9'], answer: '27', explanation: '2x = 54; x = 27' },
            { question: 'A boat travels 90 km upstream in 3 hours and 90 km downstream in 2 hours. What is its speed in still water?', options: ['37.5 km/h', '30 km/h', '45 km/h', '35 km/h'], answer: '37.5 km/h', explanation: 'Up: 30, Down: 45; still = (30+45)/2 = 37.5' },
            { question: '2/5 of a class of 40 are absent. How many are present?', options: ['24', '16', '32', '28'], answer: '24', explanation: '3/5 present; 3/5 × 40 = 24' },
            { question: 'The diagonal of a rectangle is 10 cm and one side is 6 cm. Find the other side.', options: ['8 cm', '4 cm', '7 cm', '12 cm'], answer: '8 cm', explanation: '√(100−36) = √64 = 8' },
            { question: 'If 12% of a number is 36, what is 30% of the same number?', options: ['90', '75', '100', '108'], answer: '90', explanation: 'Number = 36/0.12 = 300; 300 × 0.3 = 90' },
            { question: 'A semicircular region has diameter 20 cm. Find its area. (π ≈ 3.14)', options: ['157 cm²', '314 cm²', '78.5 cm²', '628 cm²'], answer: '157 cm²', explanation: '½ × π × 10² = 157' },
            { question: 'Ratio of flour to sugar is 5:2. You have 350g of flour. How much sugar?', options: ['140 g', '120 g', '100 g', '175 g'], answer: '140 g', explanation: '350/5 = 70; 2×70 = 140' },
            { question: 'What is (3/4)² ?', options: ['9/16', '6/8', '3/8', '9/8'], answer: '9/16', explanation: '(3/4)² = 9/16' }
        ]
    };
    /* ══════════════════════════════════════
       LOGIC QUESTIONS
       ══════════════════════════════════════ */
    var logicQuestions = [
        /* ── Pattern Recognition ── */
        { question: 'What comes next: 2, 6, 18, 54, ___?', options: ['108', '162', '72', '216'], answer: '162', type: 'pattern' },
        { question: 'What comes next: 3, 7, 15, 31, ___?', options: ['63', '47', '62', '45'], answer: '63', type: 'pattern' },
        { question: 'Find the pattern: 1, 4, 9, 16, 25, ___?', options: ['36', '30', '49', '35'], answer: '36', type: 'pattern' },
        { question: 'What comes next: 5, 10, 20, 40, ___?', options: ['80', '60', '50', '100'], answer: '80', type: 'pattern' },
        { question: 'Complete: 1, 1, 2, 3, 5, 8, ___?', options: ['13', '11', '10', '15'], answer: '13', type: 'pattern' },
        { question: 'What comes next: 100, 95, 85, 70, ___?', options: ['50', '55', '60', '45'], answer: '50', type: 'pattern' },
        { question: 'Complete: 2, 5, 10, 17, 26, ___?', options: ['37', '35', '40', '34'], answer: '37', type: 'pattern' },
        { question: 'What comes next: 1, 3, 6, 10, 15, ___?', options: ['21', '18', '20', '25'], answer: '21', type: 'pattern' },
        { question: 'Pattern: 4, 8, 16, 32, ___?', options: ['64', '48', '36', '128'], answer: '64', type: 'pattern' },
        { question: 'What comes next: 7, 11, 16, 22, 29, ___?', options: ['37', '36', '35', '38'], answer: '37', type: 'pattern' },
        { question: 'Complete: 81, 27, 9, 3, ___?', options: ['1', '0', '6', '2'], answer: '1', type: 'pattern' },
        { question: 'What comes next: 0, 1, 3, 7, 15, ___?', options: ['31', '23', '30', '29'], answer: '31', type: 'pattern' },
        { question: 'Pattern: 1, 8, 27, 64, ___?', options: ['125', '100', '81', '128'], answer: '125', type: 'pattern' },
        { question: 'What comes next: 2, 3, 5, 7, 11, ___?', options: ['13', '12', '14', '15'], answer: '13', type: 'pattern' },
        { question: 'Complete: 10, 7, 11, 8, 12, ___?', options: ['9', '13', '6', '15'], answer: '9', type: 'pattern' },
        { question: 'What comes next: 256, 128, 64, 32, ___?', options: ['16', '8', '24', '28'], answer: '16', type: 'pattern' },
        /* ── Logical Deduction ── */
        { question: 'All dragons breathe fire. Spike is a dragon. Does Spike breathe fire?', options: ['Yes', 'No', 'Maybe', 'Not enough info'], answer: 'Yes', type: 'deduction' },
        { question: 'Some wizards can fly. Gandor is a wizard. Can Gandor definitely fly?', options: ['Not necessarily', 'Yes', 'No', 'Always'], answer: 'Not necessarily', type: 'deduction' },
        { question: 'All cats are animals. All animals need water. Do all cats need water?', options: ['Yes', 'No', 'Only some', 'Maybe'], answer: 'Yes', type: 'deduction' },
        { question: 'If it rains, the ground gets wet. The ground is wet. Did it definitely rain?', options: ['Not necessarily', 'Yes', 'No', 'Always'], answer: 'Not necessarily', type: 'deduction' },
        { question: 'No fish can fly. A salmon is a fish. Can a salmon fly?', options: ['No', 'Yes', 'Maybe', 'Sometimes'], answer: 'No', type: 'deduction' },
        { question: 'All squares are rectangles. Is a rectangle always a square?', options: ['No', 'Yes', 'Sometimes', 'Depends'], answer: 'No', type: 'deduction' },
        { question: 'If A > B and B > C, which is smallest?', options: ['C', 'A', 'B', 'Cannot tell'], answer: 'C', type: 'deduction' },
        { question: 'Tom is taller than Sam. Sam is taller than Leo. Who is the tallest?', options: ['Tom', 'Sam', 'Leo', 'Cannot tell'], answer: 'Tom', type: 'deduction' },
        { question: 'All birds have feathers. A penguin is a bird. Does a penguin have feathers?', options: ['Yes', 'No', 'Maybe', 'Only some'], answer: 'Yes', type: 'deduction' },
        { question: 'If no heroes are cowards, and James is a hero, is James a coward?', options: ['No', 'Yes', 'Maybe', 'Sometimes'], answer: 'No', type: 'deduction' },
        { question: 'If all A are B, and all B are C, then all A are...?', options: ['C', 'B only', 'Not C', 'Unknown'], answer: 'C', type: 'deduction' },
        { question: 'Ava is older than Ben. Cara is older than Ava. Who is youngest?', options: ['Ben', 'Ava', 'Cara', 'Cannot tell'], answer: 'Ben', type: 'deduction' },
        { question: 'If no X is Y, and Z is X, is Z also Y?', options: ['No', 'Yes', 'Maybe', 'Depends'], answer: 'No', type: 'deduction' },
        { question: 'Every student in Room A passed. Mia is in Room A. Did Mia pass?', options: ['Yes', 'No', 'Maybe', 'Unknown'], answer: 'Yes', type: 'deduction' },
        { question: 'All roses are flowers. Some flowers fade quickly. Do all roses fade quickly?', options: ['Not necessarily', 'Yes', 'No', 'Always'], answer: 'Not necessarily', type: 'deduction' },
        { question: 'If today is Monday, what day was it 3 days ago?', options: ['Friday', 'Thursday', 'Saturday', 'Sunday'], answer: 'Friday', type: 'deduction' },
        /* ── Sequence / Series ── */
        { question: 'What letter comes next: A, C, E, G, ___?', options: ['I', 'H', 'J', 'F'], answer: 'I', type: 'sequence' },
        { question: 'Complete: Z, X, V, T, ___?', options: ['R', 'S', 'U', 'Q'], answer: 'R', type: 'sequence' },
        { question: 'What comes next: AB, CD, EF, GH, ___?', options: ['IJ', 'HI', 'JK', 'GI'], answer: 'IJ', type: 'sequence' },
        { question: 'Complete: J, F, M, A, M, J, ___?', options: ['J', 'A', 'S', 'O'], answer: 'J', type: 'sequence' },
        { question: 'Next in pattern: AZ, BY, CX, ___?', options: ['DW', 'DX', 'EW', 'CY'], answer: 'DW', type: 'sequence' },
        { question: 'What comes next: MON, TUE, WED, ___?', options: ['THU', 'FRI', 'SAT', 'SUN'], answer: 'THU', type: 'sequence' },
        { question: 'Complete: 1A, 2B, 3C, 4D, ___?', options: ['5E', '5F', '6E', '4E'], answer: '5E', type: 'sequence' },
        { question: 'What letter comes next: B, D, G, K, ___?', options: ['P', 'N', 'O', 'M'], answer: 'P', type: 'sequence' },
        { question: 'Complete the pattern: AA, BB, CC, ___?', options: ['DD', 'CD', 'EE', 'AB'], answer: 'DD', type: 'sequence' },
        { question: 'What comes next: I, II, III, IV, ___?', options: ['V', 'VI', 'IIII', 'X'], answer: 'V', type: 'sequence' },
        { question: 'Next: JAN, MAR, MAY, JUL, ___?', options: ['SEP', 'AUG', 'OCT', 'JUN'], answer: 'SEP', type: 'sequence' },
        { question: 'Complete: P, Q, S, V, ___?', options: ['Z', 'Y', 'X', 'W'], answer: 'Z', type: 'sequence' },
        { question: 'What comes next: ACE, BDF, CEG, ___?', options: ['DFH', 'DEF', 'CFH', 'EGI'], answer: 'DFH', type: 'sequence' },
        { question: 'Next: 1, 2, 4, 7, 11, 16, ___?', options: ['22', '21', '20', '23'], answer: '22', type: 'sequence' },
        { question: 'Complete: XA, WB, VC, ___?', options: ['UD', 'UE', 'TD', 'VD'], answer: 'UD', type: 'sequence' },
        { question: 'What comes next: DO, RE, MI, FA, ___?', options: ['SOL', 'LA', 'SI', 'TI'], answer: 'SOL', type: 'sequence' },
        /* ── Analogy ── */
        { question: 'Book is to reading as fork is to...?', options: ['Eating', 'Cooking', 'Cutting', 'Writing'], answer: 'Eating', type: 'analogy' },
        { question: 'Hot is to cold as tall is to...?', options: ['Short', 'Wide', 'Small', 'Thin'], answer: 'Short', type: 'analogy' },
        { question: 'Bird is to nest as human is to...?', options: ['House', 'Tree', 'Cave', 'Car'], answer: 'House', type: 'analogy' },
        { question: 'Pencil is to write as scissors is to...?', options: ['Cut', 'Draw', 'Paste', 'Erase'], answer: 'Cut', type: 'analogy' },
        { question: 'Eye is to see as ear is to...?', options: ['Hear', 'Taste', 'Smell', 'Touch'], answer: 'Hear', type: 'analogy' },
        { question: 'Moon is to night as sun is to...?', options: ['Day', 'Light', 'Sky', 'Heat'], answer: 'Day', type: 'analogy' },
        { question: 'Puppy is to dog as kitten is to...?', options: ['Cat', 'Lion', 'Rabbit', 'Tiger'], answer: 'Cat', type: 'analogy' },
        { question: 'Chapter is to book as scene is to...?', options: ['Play', 'Movie', 'Stage', 'Act'], answer: 'Play', type: 'analogy' },
        { question: 'Ice is to water as rock is to...?', options: ['Lava', 'Sand', 'Earth', 'Stone'], answer: 'Lava', type: 'analogy' },
        { question: 'Fish is to swim as bird is to...?', options: ['Fly', 'Walk', 'Run', 'Sing'], answer: 'Fly', type: 'analogy' },
        { question: 'Brick is to wall as word is to...?', options: ['Sentence', 'Letter', 'Book', 'Page'], answer: 'Sentence', type: 'analogy' },
        { question: 'Glove is to hand as shoe is to...?', options: ['Foot', 'Leg', 'Sock', 'Toe'], answer: 'Foot', type: 'analogy' },
        { question: 'Artist is to painting as author is to...?', options: ['Novel', 'Pen', 'Library', 'Stage'], answer: 'Novel', type: 'analogy' },
        { question: 'Key is to lock as password is to...?', options: ['Account', 'Computer', 'Door', 'Email'], answer: 'Account', type: 'analogy' },
        { question: 'Seed is to tree as egg is to...?', options: ['Bird', 'Nest', 'Shell', 'Feather'], answer: 'Bird', type: 'analogy' },
        { question: 'Triangle has 3 sides. Hexagon has...?', options: ['6', '5', '8', '7'], answer: '6', type: 'analogy' },
        /* ── Spatial / Visual Reasoning ── */
        { question: 'If you fold a square paper in half diagonally, what shape do you get?', options: ['Triangle', 'Rectangle', 'Rhombus', 'Pentagon'], answer: 'Triangle', type: 'spatial' },
        { question: 'How many faces does a cube have?', options: ['6', '4', '8', '12'], answer: '6', type: 'spatial' },
        { question: 'A clock shows 3:15. What is the angle between the hands?', options: ['7.5°', '0°', '15°', '90°'], answer: '7.5°', explanation: 'The hour hand moves; at 3:15 it is at 97.5° while minute hand is at 90°. Difference = 7.5°', type: 'spatial' },
        { question: 'How many edges does a rectangular prism have?', options: ['12', '8', '6', '10'], answer: '12', type: 'spatial' },
        { question: 'If you look at a mirror image of the word "AMBULANCE", which letter stays the same?', options: ['A', 'M', 'B', 'L'], answer: 'A', type: 'spatial' },
        { question: 'How many lines of symmetry does a regular pentagon have?', options: ['5', '4', '6', '10'], answer: '5', type: 'spatial' },
        { question: 'A net of a cube has how many squares?', options: ['6', '4', '8', '5'], answer: '6', type: 'spatial' },
        { question: 'How many vertices does a triangular pyramid (tetrahedron) have?', options: ['4', '3', '6', '5'], answer: '4', type: 'spatial' },
        { question: 'Which shape has no vertices?', options: ['Circle', 'Triangle', 'Square', 'Pentagon'], answer: 'Circle', type: 'spatial' },
        { question: 'If a shape has 4 equal sides and 4 right angles, it is a...?', options: ['Square', 'Rhombus', 'Rectangle', 'Parallelogram'], answer: 'Square', type: 'spatial' },
        { question: 'How many diagonals does a hexagon have?', options: ['9', '6', '12', '3'], answer: '9', type: 'spatial' },
        { question: 'If you rotate a square 90°, it looks...?', options: ['The same', 'Different', 'Like a diamond', 'Larger'], answer: 'The same', type: 'spatial' },
        { question: 'How many lines of symmetry does an equilateral triangle have?', options: ['3', '1', '2', '6'], answer: '3', type: 'spatial' },
        { question: 'A cone has how many faces?', options: ['2', '1', '3', '0'], answer: '2', type: 'spatial' },
        { question: 'If you stack 3 cubes on top of each other, how many faces are visible?', options: ['14', '18', '12', '16'], answer: '14', type: 'spatial' },
        { question: 'How many right angles are in a rectangle?', options: ['4', '2', '3', '1'], answer: '4', type: 'spatial' }
    ];
    /* ══════════════════════════════════════
       PUBLIC API
       ══════════════════════════════════════ */
    var usedMath = {};
    var usedLogic = {};
    window.Game.Questions = {
        logicQuestions: logicQuestions,
        getMathQuestion: function (levelIndex) {
            var pool = mathQuestions[levelIndex] || mathQuestions[4];
            var available = [];
            for (var i = 0; i < pool.length; i++) {
                if (!usedMath[levelIndex + '-' + i]) available.push({ q: pool[i], idx: i });
            }
            if (available.length === 0) {
                usedMath = {};
                return pool[Math.floor(Math.random() * pool.length)];
            }
            var pick = available[Math.floor(Math.random() * available.length)];
            usedMath[levelIndex + '-' + pick.idx] = true;
            return pick.q;
        },
        getLogicQuestions: function (count) {
            var available = [];
            for (var i = 0; i < logicQuestions.length; i++) {
                if (!usedLogic[i]) available.push({ q: logicQuestions[i], idx: i });
            }
            if (available.length < count) {
                usedLogic = {};
                available = [];
                for (var j = 0; j < logicQuestions.length; j++) {
                    available.push({ q: logicQuestions[j], idx: j });
                }
            }
            var result = [];
            for (var k = 0; k < count && available.length > 0; k++) {
                var r = Math.floor(Math.random() * available.length);
                usedLogic[available[r].idx] = true;
                result.push(available.splice(r, 1)[0].q);
            }
            return result;
        },
        reset: function () {
            usedMath = {};
            usedLogic = {};
        }
    };
})();
