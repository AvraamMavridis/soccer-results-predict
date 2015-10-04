# soccer-results-predict
A proof of concept of using Bayesian to predict soccer results based on history. Work in progress

#### Προγνωστικά αλγόριθμου με βάση την προϊστορία των τελευταίων 20 ετών και τα αποτελέσματα που φέρουν γενικότερα οι ομάδες ως γηπεδούχοι και φιλοξενούμενοι.

##### 5ή Αγωνιστική

| Αγώνας        | Προβλεπόμενο σημείο           | Πιθανότητα  | Αποτέλεσμα  |
| ------------- |:-------------:| :-----:| -----:|
| Kallonis - Panetolikos      | 1 | 41.91% | 5-1 ![alt text](https://raw.githubusercontent.com/AvraamMavridis/soccer-results-predict/master/correct.png "Σωστό")
| Iraklis - Xanthi      | X      |   42.14% | 1-1![alt text](https://raw.githubusercontent.com/AvraamMavridis/soccer-results-predict/master/correct.png "Σωστό")
| Olympiakos - Giannina | 1     |    68.94% | 5-1![alt text](https://raw.githubusercontent.com/AvraamMavridis/soccer-results-predict/master/correct.png "Σωστό")
| Panathinaikos - Platanias | 1      |    72.06% | 1-0![alt text](https://raw.githubusercontent.com/AvraamMavridis/soccer-results-predict/master/correct.png "Σωστό")
| Panionios - Panthrakikos | 1     |    39.13% | 1-1![alt text](http://findicons.com/files/icons/977/rrze/22/false.png "Λάθος")
| Levadeiakos - Asteras | 2     |    37.97% | 2-1![alt text](http://findicons.com/files/icons/977/rrze/22/false.png "Λάθος")
| Atromitos - PAOK | X     |    47.28% | 1-2![alt text](http://findicons.com/files/icons/977/rrze/22/false.png "Λάθος")
| Veria - AEK | 2     |    52.89% | 1-2 ![alt text](https://raw.githubusercontent.com/AvraamMavridis/soccer-results-predict/master/correct.png "Σωστό")

##### 6ή Αγωνιστική

| Αγώνας        | Προβλεπόμενο σημείο           | Πιθανότητα  | Αποτέλεσμα  |
| ------------- |:-------------:| :-----:| -----:|
| Panthrakikos - Levadeiakos      | 2 | 40.7% | 1-3 ![alt text](https://raw.githubusercontent.com/AvraamMavridis/soccer-results-predict/master/correct.png "Σωστό")
| Panetolikos - Panionios      | X      |   37.9% | 1-5![alt text](http://findicons.com/files/icons/977/rrze/22/false.png "Λάθος")
| Xanthi - Panathinaikos | 2      |    58.46% | 0-1![alt text](https://raw.githubusercontent.com/AvraamMavridis/soccer-results-predict/master/correct.png "Σωστό")
| AEK - Atromitos | 1      |    48.25% |
| Giannina - Iraklis | X     |    41.20% |
| Kalloni - Veria | 1     |    42.19% |
| Asteras - Platanias | 1     |    44.87% |
| PAOK - Olympiakos | 2     |    46.86% |

Το πρότζεκτ αυτο προσπαθεί να εξετάσει ποιες παραμέτρους είναι σημαντικές για την πρόβλεψη με βάση την προϊστορία, η ανάπτυξη του ειναι σε εξέλιξη, προς το παρόν λαμβάνουμε υπόψη "Γηπεδούχο", "Φιλοξενούμενο", στην συνέχεια θα προστεθούν και άλλοι παράμετροι όπως π.χ. τις αποδόσεις των στοιχηματικών εταιρίων για το αντίστοιχο ματς στο παρελθόν.
