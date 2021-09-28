# Bachelorarbeit

Dieses GitHub Repository beinhaltet alle Dateien, welche bei der Erstellung der Bachelorarbeit mit dem Titel "Ästhetisches Empfinden für Bilder von Sonnenuntergängen für Personen verschiedener geographischer Standorte" benutzt wurden. Es folgt eine Beschreibung der Ordnerstruktur. Jeder Ordner wird mit seiner Funktion beschrieben.

|Ordnername| Beschreibung| Inhalt|
|--|--|--|
| AVA | Wurde anfangs für das Herunterladen des AVA Datensatzes benutzt. Der Datensatz wurde letzten Endes nicht benutzt. | Kategorie-Detail Textdateien, abgeänderte Download-Skripte eines veralteten Crawlers |
|Auswerter|Wurde für die Konvertierung der Experimentresultate in Datenobjekte und die gesamte Datenauswertung benutzt.| Datenauswerter Jupyter Notebook, Python Helferskript, Abbildungen, Informations-CSV-Datei der Bilder, R Auswerter Skript für die 4. Hypothese, Daten der Versuchspersonen|
|CC Crawler|Wurde für den Bildcrawler verwendet. Enthält zudem eine HTML Snapshots von der CC Crawler Seite, um nicht ein "Infinity Scrolling" für den Crawler implementieren zu müssen, da dies sehr aufwendig ist.|Dateien des CreativeCommons.org Bildcrawlers|
|Experiment|Wurde für das OpenSesame und PsychoPy Experiment verwendet. Hinweis: Da das PsychoPy Experiment bereits auf einem GitLab Repository existiert, wurde es nicht explizit hochgeladen. Link zum PsychoPy GitLab Repository: https://gitlab.pavlovia.org/chrismw/sunset-experiment.|Alle benötigten Datein, inklusive des PsycoPy "demographics" Projektes |
|Expose|-|Initiales Exposé und Idealo Informationsdatei (welche für die ursprüngliche Idee verwendet wurde)|
|Labeler|Wurde für die Aussortierung und Etikettierung der rohen Bilddaten verwendet.|<ul><li>*extra_images* - Bilder aus der letzten Nachbeschaffung</li><li>*final_images* - die letztendliche Bildauswahl nach Kategorie geordnet (die 10 ausgewählten Bilder befinden sich im Unterordner ***merge***)</li><li>*images* - alle heruntergeladenen Bilder</li><li>*my_images* - alle initial selbst-hinzugefügten Bilder</li><li>*phototagger_v1_en* - Das Phototagger Programm</li><li>*taggedImages* - die erste Aussortierung (nach Benutzungsgrad)</li><li>Labeler Jupyter Notebook (hiermit wurde alles konsolidiert)</li><li>*firstSortOut.txt* - Datei mit Benutzungsgraden aller Bilder</li><li>Abbildungen/Statistiken</li></ul>|
|Recherche|Wurde für Recherchezwecke benutzt.|Statistiken, Papers und Screenshots.|

Die Reihenfolge, in welcher die Order erstellt (und benutzt) wurden ist:
AVA - Expose - CC Crawler - Experiment - Recherche - Auswerter - Labeler

Die übrigen Dateien sind selbsterklärend.
