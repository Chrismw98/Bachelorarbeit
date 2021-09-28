# Analysis of CW data, Mixed-design ANOVA
# GA, 16.9.2021

install.packages("afex")
install.packages("emmeans")
install.packages("ggplot2")

library(afex)
library(emmeans)
library(ggplot2)

# change path accordingly
#setwd("~/tubCloud/1.2021.Projects/Christian_W/Auswertungsinfrastruktur/Auswertungsinfrastruktur/Auswerter")
setwd("./")
setwd("D:/Documents/Uni Kurse/Bachelorarbeit/Auswerter")

# reading data 
df <- read.delim('dataframe_hyp4.csv', header=TRUE, sep=",")

# and converting variable columns to factors
df$Person <- as.factor(df$Person)
df$Umgebung <- as.factor(df$Umgebung)
df$Aufwachsort <- as.factor(df$Aufwachsort)

# plotting
bargraph<-ggplot(df, aes(Umgebung, MOS, fill=Umgebung)) +
        geom_bar(stat="summary",position = "dodge") + 
        facet_grid(.~Aufwachsort) +
        scale_fill_brewer(palette="Dark2")

bargraph


###### Mixed Design ANOVA with package afex
# Mixed-effect ANOVA
# dependent  variable: MOS (on the left side of the tilde)
# within variable(s): the variable(s) measured using same participants ("within" them) 
# between variable(s): the variable(s) measured using different participants ("between" them)
# participant: participant ID. It's given inside Error(), together with the within-variable

# there are many functions that can do the same ANOVA analysis in R.
# aov_ez(), aov_car(), aov_4(). They differ on how the arguments are passed but results are the same.

a1 <- aov_ez("Person", "MOS", df, between="Aufwachsort", within='Umgebung')

print(a1)

# the ANOVA table shows that the two main effects are signifficant 
# (for Aufwachsort and Umgebung), and also that the interaction effect is signifficant

## post-hoc contrasts

# As the two main effect have only two levels each, we know which one
# ae signifficant (no need of pairwise-comparisons) 

# just for completion we can show the main effects separatedely, get their confidence intervals etc.

# main effect for Umgebung (within variable)
m1 <-emmeans(a1, ~Umgebung)
m1

pairs(m1) # significant


# main effect for Aufwachsort (between variable)
m2 <-emmeans(a1, ~Aufwachsort)
m2

pairs(m2) # slight significance


# now as the interaction term is significant, we also can check
# which pair is sig. different with which other pair.

## Interaction term 
inter <- emmeans(a1, ~Aufwachsort*Umgebung)
print(inter)

print(pairs(inter, reverse=TRUE))
            
# significant differences are for 
# de/beach  vs. de/landscape
# gr/beach vs. de/landscape
# gr/beach vs. gr/landscape
# de/landscape vs. gr/landscape

# as the table shows, p-values are already adjusted by Tukey method.

#ADDED BY ME:
#now get the confidence intervals of the comparisons
summary(pairs(inter, reverse=TRUE), infer=TRUE)
summary(pairs(inter, reverse=FALSE), infer=TRUE)


# Sources:
# https://cran.r-project.org/web/packages/afex/vignettes/afex_anova_example.html
# https://ademos.people.uic.edu/Chapter21.html#2_mixed_design_anovas_(afex)


