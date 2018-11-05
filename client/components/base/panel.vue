<style lang="scss" rel="stylesheet/scss" scoped>
// table,standard
/* 外层无边框样式 */
.no_border{
    overflow: inherit;
    box-shadow: none !important;
    border:none !important;
    background-color: transparent;
}



.table.recentWithdraw{
	.panel_foot{
		padding: 0;
	}
}
.table.affiliate{
	.panel_foot{
		padding: 0;
	}
}
@media only screen and (min-width: 768px) {
	.wrap { // 默认为表格
		border-radius: 4px;
		background-color: #ffffff;
		box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
		border: solid 0.5px rgba(0, 0, 0, 0.2);
	    overflow: hidden;
	}
    .bgf7{background-color: #f7f7fa;}
	// .table{
	//     .panel_foot{
	//         // padding: 48px;
	//     }
	// }
	.table.affiliate{
		.panel_foot{
			padding-bottom: 31px;
	    }
	}
    .standard{
        padding: 48px;
    }
}

@media only screen and (max-width: 768px) {
	.table{
		border-top: none;
		// .panel_foot{
		// 	// padding: 32px 0 48px 0;
		// }
	}
	.table.recentWithdraw{
		margin-top: 96-48px;
	}
    .standard{
        padding: 23px;
    }

}
</style>

<template lang="html">
    <section class="wrap" v-loading="loading">
        <header class="panel_head">
            <slot name="head">

            </slot>
        </header>
        <section class="panel_content">
            <slot name="content">
                <p v-html="initData" slot="content" v-if="initData"></p>
                <p v-else>放入盒子内容</p>
            </slot>
        </section>
        <footer class="panel_foot clearfix">
            <slot name="foot">
            </slot>
        </footer>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex"

export default {
    props:['loading','initData'],
    computed:{
       // ...mapState({
       //     currentUser: state => state.auth.currentUser,
       // }),
   },
}
</script>
